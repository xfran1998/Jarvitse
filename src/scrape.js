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
  await getTaskCalendar(page);

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

async function getTaskCalendar(page){
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

  // get all day button with class=month-view-day
  const all_days = await page.locator('[data-drop-zone="month-view-day"]');
  // const day5 = await all_days.allTextContents()
  const day5 = await all_days.locator('[data-day="4"]').first();
  const inner = await day5.innerHTML();
  // const day5 = await page.textContent('.month-view-day');
  
  await day5.click();
  // wait pop up
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  await page.screenshot({path: 'list_task.png'});

  // get list of .eventlist items
  const title_tasks = await page.locator('.eventlist .name.d-inline-block').allInnerTexts();
  const time_tasks = await page.locator('.eventlist span.dimmed_text').allInnerTexts();
  const subject_task = await page.locator('.eventlist div.col-11 > a').allInnerTexts();

  // join title and time in object {title: '', time: ''}
  const tasks = title_tasks.map((title, index) => {
    return {
      title: title,
      time: time_tasks[index].replace('»', 'hasta').replace(',', ' a las'),
      subject: subject_task[index]
    }
  });

  
  // print url
  console.log(await page.url(), '\n\n');

  // save all in json format
  const json_list_task = JSON.stringify(tasks);
  console.log(json_list_task);
  
  // save json_list_task in file
  writeFile('json_list_task.json', json_list_task, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  
  console.log('\n ***** End GetTaskCalendar ***** \n');
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