# JavaScript module - practice

## Setup

- Install [`live-server`](https://www.npmjs.com/package/live-server) on your machine if its not the case
- Clone this repository somewhere on your filesystem
  ```bash
  $> git clone https://github.com/Tazaf/masrad-dfa-js-module-practice.git
  ```
- Go to the cloned directory
  ```bash
  $> cd masrad-dfa-js-module-practice
  ```
- Start `live-server`:
  ```bash
  $> live-server
  ```

## What you need to do

- Split the code in `js/scripts.js` into separate modules :
  - `alignment.js` - Contains functions related to alignment features
  - `dialogs.js` - Contains functions for managing DiaLog lists
  - `messages.js` - Contains functions for managing messages
  - `setup.js` - Contains functions that sets up the app event listeners
  - `templates.js` - Contains functions related to template management
  - `utils.js` - Contains miscellanous functions
- All your modules should be placed in an `app` directory in the `js` folder
- In the end, the `js/script.js` file should only call whatever is exported by the `js/app/setup.js` file to set up the application code.

**Your task is to figure out how to use ES6 module syntax to export functions (if necessary) and import them where they are needed.**

> The app should obviously behave exactly the same after you split the code ;)
