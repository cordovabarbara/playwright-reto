import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.bon-bonite.com/');
  
  // Esperar a que el popup de cookies sea visible
  await page.waitForSelector('button:has-text("Aceptar todo")', { timeout: 10000 });
  await page.getByRole('button', { name: 'Aceptar todo' }).click();
  
  // Esperar a que el popup desaparezca
  await page.waitForSelector('button:has-text("Aceptar todo")', { state: 'hidden' });
  
  await page.context().storageState({ path: 'cookies.json' });
  await browser.close();
}

export default globalSetup;