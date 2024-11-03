const fs = require('fs');
const puppeteer = require('puppeteer');

const browser = puppeteer.launch();
const page = browser.newPage();


  // Assuming the HTML file is in the same directory as this script
const htmlFilePath = './Resume/resume.json';
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
page.setContent(htmlContent, { waitUntil: 'networkidle0' });

page.pdf({ path: '../Result/Sathya_Bhat_Resume_Latest.pdf', format: 'a4', printBackground: true });
browser.close();