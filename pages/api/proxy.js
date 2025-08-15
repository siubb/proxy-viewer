const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    const content = await page.content();
    res.status(200).send(content);
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  } finally {
    if (browser) await browser.close();
  }
}
