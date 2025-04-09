const puppeteer = require('puppeteer');
const fs = require('fs');

const docHeight = () => {
  const body = document.body
  const html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

(async () => {

  // Get type of source from process.argv, default to url
    var htmlFilePath = "Sathya_Bhat_Resume_Latest.html"

  // Create a browser instance
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 10000,
    });

  // Create a new page
    const page = await browser.newPage();

    const html = fs.readFileSync(htmlFilePath, 'utf8');
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');
    // const height = await page.evaluate(docHeight);


    await page.pdf({ path: 'Sathya_Bhat_Resume_Latest.pdf', printBackground: true, margin: {
      top: "10px",
      right: "0px",
      bottom: "15px",
      left: "0px"
  }})

  // Close the browser instance
    await browser.close();
  
})();

