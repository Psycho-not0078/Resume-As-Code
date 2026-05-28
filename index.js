const puppeteer = require('puppeteer');
const path = require('path');

const HTML_FILE = 'Sathya_Bhat_Resume_Latest.html';
const PDF_FILE = 'Sathya_Bhat_Resume_Latest.pdf';

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--font-render-hinting=none'],
    timeout: 30000,
  });

  try {
    const page = await browser.newPage();

    await page.goto('file://' + path.resolve(HTML_FILE), {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.evaluateHandle('document.fonts.ready');
    await page.emulateMediaType('print');

    // Let the theme's @page rule control size and margins.
    // Do NOT pass `format` or `margin` here — they would override @page.
    await page.pdf({
      path: PDF_FILE,
      printBackground: true,
      preferCSSPageSize: true,
    });

    console.log(`PDF written to ${PDF_FILE}`);
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});