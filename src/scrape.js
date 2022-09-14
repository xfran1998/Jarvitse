// Open command line
// npx playwright codegen https://aulavirtual.uv.es/calendar/view.php?view=month

const { chromium } = require('playwright');
const { parse } = require('node-html-parser');
const { writeFile } = require('fs');

(async () => {
  const browser = await chromium.launch(
    {
      headless: true,
    }
  );
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  // login to uv
  await login(page);

  // fetch tasks calendar

  // *** TEST ***
  // days: [day_init, day_end]
  const commands = { days: [
                            {day:29, month: 9, year: 2022},
                            {day:30, month: 9, year: 2022},
                            {day:1, month: 10, year: 2022},
                            {day:2, month: 10, year: 2022},
                            {day:3, month: 10, year: 2022},
                          ], subjects: true, links: true }; 

  await getTaskCalendar(page, commands);

  // post tasks calendar
  // await postTaskCalendar(page);

  // ---------------------
  await context.close();
  await browser.close();
})();

async function login(page){
  // Go to https://aulavirtual.uv.es/login/index.php
  await page.goto('https://aulavirtual.uv.es/login/index.php');
  // Click text=Usuaris de la Universitat
  await page.locator('text=Usuaris de la Universitat').click();
  // assert.equal(page.url(), 'https://as.uv.es/cgi-bin/AuthServer?ATTREQ=poaid&PAPIPOAREF=898713260&PAPIPOAURL=https%3A%2F%2Fas.uv.es%3A443%2Fsaml%2Fsaml2%2Fidp%2FSSOService.php%3FSAMLRequest%3DjVJtT8IwEP4rS7%252BzQScMGiBBiZFEhTD0g1%252FM0R3SZGtnr0X993YDE4zRmDRNc3fPS5%252FcmKAqazHzbq%252FX%252BOqRXPRelZpE25gwb7UwQIqEhgpJOCny2d2t4HFX1NY4I03JziB%252FI4AIrVNGs2gxn7DnLJV9AJltebHdDVK%252ByyTvZ8PeaJBh2schz%252FgQL2SxlSx6REsBOWGBKMCJPC40OdAulLqcd7ppOBueiu5IXAyeWDQPv1EaXIvaO1eTSBKg2B9ipKRx2148UUWd5PkyR3tQEuN6X7No9mX1ymjyFdpT92F9e0bmSzgo6zyUJ1YISZ5YqT4%252BOiCp4fw5zaLVKcJLpQulX%252F5Ob3scInGz2aw6q2W%252BYdNxIyHaNOz0v7YqdFCAg8bVODlnGB%252F34T5oL%252BYrUyr5EV0bW4H73Vov7rUVVXR27ajwmmqUaqewCEGWpXm7sggOJ8xZjyyZHkW%252F7930Ew%253D%253D%26RelayState%3Dhttps%253A%252F%252Faulavirtual.uv.es%252Fauth%252Fsaml2%252Flogin.php%253Fwants%2526idp%253D4e8be24519039f539b66e0137c391656%2526passive%253Doff%26SigAlg%3Dhttp%253A%252F%252Fwww.w3.org%252F2001%252F04%252Fxmldsig-more%2523rsa-sha256%26Signature%3DjMAqtWRGEADlDwaBrEJLulEbz%252Bcr6LVdWON7nydGufMbjmaGJek5ozTZ%252F7UlnG2MGcGBcaKbIbyzbaZsf6WDgV84GSR7gv2ESgCzr2U9W%252FA2ulpZzWDboIQf2unKfJKBDQ1gGL7CgWaWJvWAKAgU0ZndCR8otjxGLMZ6f04Q6TTggH7gM3WOWBC40D19cJTA9ttjXcuinSj45vKu3jlTK6rVQ0CSAqMos25BTl58jJ1J8yVDr31xmCOkRSejf%252BiJF%252BXVsxdt%252B%252Fc7SEpvJ0Idcu0fnc2pduY2Mmnk9ztcwfozAtMHrNfXDpVKOnRGFw6WoB6%252BbjgUEbN6AP65aRbQWA%253D%253D&PAPIOPOA=https%3A%2F%2Faulavirtual.uv.es%2Fauth%2Fsaml2%2Fsp%2Fmetadata.php');
  // Click input[name="username"]
  // await page.locator('input[name="username"]').click();
  // Fill input[name="username"]
  await page.locator('input[name="username"]').fill('seafran');
  // Press Tab
  await page.locator('input[name="username"]').press('Tab');
  // Click input[name="password"]
  await page.locator('input[name="password"]').click();
  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('Torrente1998!');
  // Press Enter
  await page.locator('input[name="password"]').press('Enter');
  // assert.equal(page.url(), 'https://as.uv.es/saml/saml2/idp/SSOService.php?SAMLRequest=jVJtT8IwEP4rS7%2BzQScMGiBBiZFEhTD0g1%2FM0R3SZGtnr0X993YDE4zRmDRNc3fPS5%2FcmKAqazHzbq%2FX%2BOqRXPRelZpE25gwb7UwQIqEhgpJOCny2d2t4HFX1NY4I03JziB%2FI4AIrVNGs2gxn7DnLJV9AJltebHdDVK%2ByyTvZ8PeaJBh2schz%2FgQL2SxlSx6REsBOWGBKMCJPC40OdAulLqcd7ppOBueiu5IXAyeWDQPv1EaXIvaO1eTSBKg2B9ipKRx2148UUWd5PkyR3tQEuN6X7No9mX1ymjyFdpT92F9e0bmSzgo6zyUJ1YISZ5YqT4%2BOiCp4fw5zaLVKcJLpQulX%2F5Ob3scInGz2aw6q2W%2BYdNxIyHaNOz0v7YqdFCAg8bVODlnGB%2F34T5oL%2BYrUyr5EV0bW4H73Vov7rUVVXR27ajwmmqUaqewCEGWpXm7sggOJ8xZjyyZHkW%2F7930Ew%3D%3D&RelayState=https%3A%2F%2Faulavirtual.uv.es%2Fauth%2Fsaml2%2Flogin.php%3Fwants%26idp%3D4e8be24519039f539b66e0137c391656%26passive%3Doff&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=jMAqtWRGEADlDwaBrEJLulEbz%2Bcr6LVdWON7nydGufMbjmaGJek5ozTZ%2F7UlnG2MGcGBcaKbIbyzbaZsf6WDgV84GSR7gv2ESgCzr2U9W%2FA2ulpZzWDboIQf2unKfJKBDQ1gGL7CgWaWJvWAKAgU0ZndCR8otjxGLMZ6f04Q6TTggH7gM3WOWBC40D19cJTA9ttjXcuinSj45vKu3jlTK6rVQ0CSAqMos25BTl58jJ1J8yVDr31xmCOkRSejf%2BiJF%2BXVsxdt%2B%2Fc7SEpvJ0Idcu0fnc2pduY2Mmnk9ztcwfozAtMHrNfXDpVKOnRGFw6WoB6%2BbjgUEbN6AP65aRbQWA%3D%3D');
  // wait https://aulavirtual.uv.es/my/ is loaded
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // return page;
}

async function getTaskCalendar(page, commands){
  // console.log(page);
  const url = await page.url();
  console.log(url);
  
  // assert days != null
  if(!commands){
    console.log('Error commands');
    return;
  }

  const { days, subjects=false, links=false } = commands;

  // assert days != null
  if(!days){
    console.log('No days specified');
    return;
  }

  if (!url.includes('https://aulavirtual.uv.es/calendar/view.php?view=month')){
    //page should be in uv
    await page.goto('https://aulavirtual.uv.es/calendar/view.php?view=month');
    // wait https://aulavirtual.uv.es/my/ is loaded
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    console.log('error page: '+url);
    console.log('redirected to https://aulavirtual.uv.es/calendar/view.php?view=month');
  }

  // *** TEST ***
  const calendar = await page.locator(".heightcontainer .calendarwrapper");
  const prev_month = await calendar.locator(".controls .arrow").nth(0);
  const next_month = await calendar.locator(".controls .arrow").nth(1);
  
  let month = parseInt(await calendar.getAttribute("data-month"));
  let year = parseInt(await calendar.getAttribute("data-year"));
  console.log(`Month: ${month}, Year: ${year}`);

  const all_task = [];
  
  console.log(days);

  for (const d of days) {
    console.log('\n*************** Getting task DAY ***************');
    console.log(d);
    console.log(`DAY_day: ${d.day}, DAY_Month: ${d.month}`);

    // while (year != day.year) not implementing yet
    while (!isSameDate(month, year, d.month, d.year)) {
      console.log(`Antes: Month: ${month}, Year: ${year}`);
      
      // Check if have to go to next month or previous month
      if (isPrevMonth(month, year, d.month, d.year)){
        await prev_month.click();
        month -= 1;
        month == 0 ? (month = 12, year -= 1) : month;
      }
      else{
        await next_month.click();
        month += 1;
        month == 13 ? (month = 1, year += 1) : month;
      }

      try {
        console.log(`month: ${month}`);
        if (!await expect(calendar, calendar.getAttribute, 5000, month, "data-month")) {
          console.log('Error getting month');
          break;
        }
      }
      catch (err) {
        console.log('error: '+err);
        break;
      }
      
      console.log(`Month: ${month}, Year: ${year}`);
    }

    
    const day = await page.locator('.day.clickable').nth(d.day-1);
    const task_day = await day.locator('li a');
    const num_task = await task_day.count();
    
    console.log('\n***** Getting INFO *****');
    for (let i = 0; i < num_task; i++) {
      const task = await task_day.nth(i);

      // get modal popup
      await task.click();
      const modal = await page.locator('.modal-content');

      const task_info = await getInfoTask(modal, { delivery_date: true,
                                                  subject: true,
                                                  link: true,
                                                  description: true });
      all_task.push(task_info);

      // close modal popup
      await modal.locator('.close').click();
    }
    // all_task.push({ task: { TODO: todo, subject: null, link: null}, date: {day: d.day, month: day.month, year: d.year} });

    console.log(`Current month is ok`);
  }
  
  
  // get data-month and data-year

  // return;


  // get all day button with class=month-view-day
  // const all_days = await page.locator('[data-drop-zone="month-view-day"]');
  // // const day5 = await all_days.allTextContents()
  // const day5 = await all_days.locator('[data-day="4"]').first();
  // const inner = await day5.innerHTML();
  // const day5 = await page.textContent('.month-view-day');

  // get all elements of days (".day.clickable") [0-30] --> day 1 to day 31 ordered
  // const day = await page.locator('.day.clickable').nth(4);
  
  // post task
  // await day5.click();
  // wait pop up
  // await page.waitForNavigation({ waitUntil: 'networkidle0' });
  // await page.screenshot({path: 'list_task.png'});

  // get list of .eventlist items
  // const title_tasks = await page.locator('.eventlist .name.d-inline-block').allInnerTexts();
  // const time_tasks = await page.locator('.eventlist span.dimmed_text').allInnerTexts();
  // const subject_task = await page.locator('.eventlist div.col-11 > a').allInnerTexts();

  // // join title and time in object {title: '', time: ''}
  // const tasks = title_tasks.map((title, index) => {
  //   return {
  //     title: title,
  //     time: time_tasks[index].replace('»', 'hasta').replace(',', ' a las'),
  //     subject: subject_task[index]
  //   }
  // });

  // const task_day = await day.locator('.eventname').allInnerTexts();  
  
  // print url
  console.log(await page.url(), '\n\n');

  // save all in json format
  const json_list_task = JSON.stringify(all_task);
  console.log(json_list_task);
  
  // save json_list_task in file
  writeFile('json_list_task.json', json_list_task, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  
  console.log('\n ***** End GetTaskCalendar ***** \n');
}

async function getInfoTask(modal, options){
  const data = {
    todo: null,
    delivery_date: null,
    subject: null,
    link: null,
    description: null
  }

  // get todo
  data.todo = await modal.locator('.modal-title').innerHTML();
  
  // get content body of the modal with all info 
  const content = await modal.locator('.col-11');  
  const ev = await content.nth(1).innerHTML(); 

  // check if it's a user note --> second element innerHTML is 'Evento de usuario'
  if (ev.includes('Evento de usuario')){
    console.log('User task');
    data.subject = 'Evento de usuario';
    return data;
  }
  
  // check is it's a course task, if not exit function
  if (!ev.includes('Evento de curso')){
    console.log('Error, not a course task:', ev);
    return data;
  }
  

  // it's a professor note
  // get info requested
  if (options.delivery_date)
    // data.delivery_date = (await Promise.all([content.nth(0).locator('a').innerHTML(), 
    //                                         content.nth(0).textContent()])).join('');
    data.delivery_date = await content.nth(0).textContent();
  if (options.subject)
    data.subject = await content.nth(3).textContent();
  if (options.link)
    data.link = await modal.locator('.modal-footer a').getAttribute('href');
  if (options.description)
    data.description = await content.nth(2).textContent();

  return data;
}

async function postTaskCalendar(page){
  // console.log(page);
  const url=await page.url();
  console.log(url);
  
  if (!url.includes('https://aulavirtual.uv.es/calendar/view.php?view=month')){
    //page should be in uv
    await page.goto('https://aulavirtual.uv.es/calendar/view.php?view=month');
    // wait https://aulavirtual.uv.es/my/ is loaded
    // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    
    console.log('error page: '+url);
    console.log('redirected to https://aulavirtual.uv.es/calendar/view.php?view=month');
  }
  
  // Click span:has-text("Calendario")
  // await page.locator('span:has-text("Calendario")').click();
  // assert.equal(page.url(), 'https://aulavirtual.uv.es/calendar/view.php?view=month');
 
  // // Click text=Sin eventos, sábado, 5 marzo 5 Sin eventos, sábado, 5 marzo 5
  // await page.locator('text=Sin eventos, sábado, 5 marzo 5 Sin eventos, sábado, 5 marzo 5').click();
  // await page.locator('data-day="4"').click();
  // // Click input[name="name"]
  // await page.locator('input[name="name"]').click();
  // // Fill input[name="name"]
  // await page.locator('input[name="name"]').fill('test23');
  // await page.screenshot({path: 'save.png'});
  // // Click button:has-text("Guardar")
  // await page.locator('button:has-text("Guardar")').click();
  
  
  // get all day button with class=month-view-day
  const all_days = await page.locator('[data-drop-zone="month-view-day"]');
  // const day5 = await all_days.allTextContents()
  const day5 = await all_days.locator('[data-day="3"]').first();
  const inner = await day5.innerHTML();
  // const day5 = await page.textContent('.month-view-day');
  
  await day5.click();
  // wait pop up
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.screenshot({path: 'user2.png'});
  
  // print url
  console.log(await page.url());
  

  console.log('fin task scrape');

  // return page;
}



// new file

const isSameDate = (month, year, day_month, day_year) => {
  return month == day_month && year == day_year;
}

const isPrevMonth = (month, year, day_month, day_year) => {
  if (year > day_year) return true;
  else if (year == day_year && month > day_month) return true;
  else return false;
}

async function expect(obj, func, timeout, iqual, ...args) {
  obj.func = func;
  return new Promise((resolve, reject) => {
    const interv = setInterval(async () => {
      console.log('waiting for', await obj.func(...args));
      console.log('iguals', iqual);
      if (await obj.func(...args) == iqual) {
        clearInterval(interv);
        resolve();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(interv);
      reject('No task found');
    }, timeout);
  });
}