import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  console.log('chrome-aws-lambda version:', require('chrome-aws-lambda/package.json').version);

  const targetUrl = req.query.url;
  if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
    return res.status(400).json({ error: 'Invalid or missing "url" query parameter' });
  }

  let browser = null;
  try {
    const executablePath = await chromium.executablePath(); // async function

    if (!executablePath) {
      console.error('Chromium executable not found');
      return res.status(500).json({ error: 'Chromium executable not found' });
    }

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const content = await page.content();
    res.status(200).send(content);
  } catch (error) {
    console.error('Puppeteer error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch page' });
  } finally {
    if (browser) await browser.close();
  }
}