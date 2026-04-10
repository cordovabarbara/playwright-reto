import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.bon-bonite.com/');
  await page.getByRole('button', { name: 'Aceptar todo' }).click();
  
  // Guarda el estado (cookies + localStorage)
  await page.context().storageState({ path: 'cookies.json' });
  await browser.close();
}

export default globalSetup;