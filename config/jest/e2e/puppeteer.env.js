'use strict';

const fs = require('fs');
const puppeteer = require('puppeteer');
const NodeEnvironment = require('jest-environment-node');

const { E2E_WS_PATH } = require('../../paths');
class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = fs.readFileSync(E2E_WS_PATH, 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // connect to puppeteer
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint
    });

    // store the base url
    const PORT = parseInt(process.env.PORT, 10) || 8080;
    this.global.__BASE_URL__ = `http://localhost:${PORT}`;
  }

  async teardown() {
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
