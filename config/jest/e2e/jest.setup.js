'use strict';

const fs = require('fs');
const puppeteer = require('puppeteer');

const { startE2EServer, cleanE2EFolders } = require('./utils');
const { E2E_TEMP_DIR_PATH, E2E_WS_PATH } = require('../../paths');

module.exports = async function() {
  try {
    // ensure the e2e folders are deleted
    console.log('\nCleaning the E2E testing environment...');
    cleanE2EFolders();

    // set-up the e2e server
    console.log('Starting the E2EServer...');
    const server = await startE2EServer();

    console.log('Starting the Headless Browser...');
    const browser = await puppeteer.launch();
    // store the browser  and server instance so we can teardown it later
    // this global is only available in the teardown but not in TestEnvironments
    global.__SERVER_GLOBAL__ = server;
    global.__BROWSER_GLOBAL__ = browser;

    // use the file system to expose the wsEndpoint for TestEnvironments
    fs.mkdirSync(E2E_TEMP_DIR_PATH);
    fs.writeFileSync(E2E_WS_PATH, browser.wsEndpoint());
  } catch (error) {
    console.log('Setup Error', error);
  }
};
