'use strict';

const { cleanE2EFolders } = require('./utils');

module.exports = async function() {
  try {
    // close the browser instance
    await global.__BROWSER_GLOBAL__.close();

    // close the application server
    if (global.__SERVER_GLOBAL__) {
      global.__SERVER_GLOBAL__.close();
    }

    // clean-up the e2e files
    console.log('Cleaning the E2E testing environment...');
    cleanE2EFolders();
  } catch (error) {
    console.log('Teardown Error', error);
  }
};
