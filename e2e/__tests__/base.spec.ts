import { Page, Browser } from 'puppeteer';

const browser: Browser = global['__BROWSER__'];
const baseUrl: string = global['__BASE_URL__'];

describe('App', () => {
  let page: Page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
  });

  it('should have a main container ', async () => {
    const app = await page.$('#app');
    await expect(app).not.toBeNull();
  });
});
