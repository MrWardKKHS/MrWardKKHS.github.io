const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const deckDir = path.join(__dirname);

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  const files = fs.readdirSync(deckDir).filter(f =>
    f.endsWith('.html') && f !== 'index.html'
  );

  for (const file of files) {
    const name = file.replace(/\.html$/, '');
    const thumbPath = path.join(deckDir, `${name}-thumb.png`);
    const url = `file://${path.join(deckDir, file)}`;

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    console.log(`📸 Rendering: ${file}`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait until Reveal has initialized
    await page.waitForFunction(() => {
      return typeof Reveal !== 'undefined' && Reveal.isReady();
    });

    const slideElement = await page.$('.reveal'); // Main container
    if (slideElement) {
      await slideElement.screenshot({ path: thumbPath });
      console.log(`✅ Screenshot saved: ${thumbPath}`);
    } else {
      console.warn(`⚠️ No .reveal element found in ${file}`);
    }

    await page.close();
  }

  await browser.close();
})();

