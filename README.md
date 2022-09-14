# Jarvitse

Tool for University Students to manage their schedule.

## Building parts of Jarvitse

### Part 1 - Speech Recognition
Is already built with python, need an audio file from web in wav format to work, still working how to get raw data from the web audio api to wav format.
Maybe use ffmpeg to convert the raw data to wav format or just use the speech recognition api from google (Only Chrome supports it from what i know).

### Part 2 - Fetch Calendar Tasks
It's already done with NodeJS Playwright. Authentication user is needed to get the tasks from the calendar.

### Part 3 - Get audio
Still thinking how to get it from the phone, maybe using the web as an app or maybe build an app for android with android studio.

### Part 4 - Command recognition
Transform the string to a array of days the Part 2 program already understands as an input.