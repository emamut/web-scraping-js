import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

const page = await browser.newPage();

await page.goto(
  'https://solidwp.com/blog/wordpress-vulnerability-report-april-24-2024/'
);

const items = await page.$$eval(
  'article.solidwp-vulnerability__root',
  (results) =>
    results.map((el) => {
      const title = el.querySelector('h3')?.innerText;
      if (!title) return null;

      const version = el.querySelector('dl > div:nth-child(5) > dd')?.innerText;

      return { title, version };
    })
);

console.log(items);
await browser.close();
