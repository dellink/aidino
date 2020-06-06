const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ offline: true });

  await page.goto('http://github.com/').catch(() => {});
  await page.waitForSelector('canvas');
  await page.exposeFunction('jump', () => page.keyboard.press('Space'));
  await page.exposeFunction('jumpLong', () => page.keyboard.press('Space', { delay: 100 }));
  await page.exposeFunction('down', () => page.keyboard.down('ArrowDown'));
  await page.exposeFunction('upDown', () => page.keyboard.up('ArrowDown'));
  await page.evaluate(() => {
    setInterval(() => {
      const obstacle = Runner.instance_.horizon.obstacles[0];
      if (obstacle && obstacle.xPos < 120) {
        if (obstacle.typeConfig.type === 'PTERODACTYL' && obstacle.yPos < 100) {
          down();
        } else {
          upDown();
          if (obstacle.typeConfig.type === 'CACTUS_LARGE') {
            jumpLong();
          } else {
            jump();
          }
        }
      } else {
        upDown();
      }
    });
    
  });
  await page.keyboard.press('Space');
})();
