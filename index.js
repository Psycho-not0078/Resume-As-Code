const fs = require('fs');
const puppeteer = require('puppeteer');

const html = fs.readFileSync(htmlFilePath, 'utf8');

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true })
await browser.close()
