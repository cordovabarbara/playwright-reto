import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.bon-bonite.com/');
  
  // Intentar aceptar cookies solo si el popup aparece
  try {
    await page.waitForSelector('button:has-text("Aceptar todo")', { timeout: 5000 });
    await page.getByRole('button', { name: 'Aceptar todo' }).click();
  } catch {
    // El popup no apareció, continuar igual
  }
  
  await page.context().storageState({ path: 'cookies.json' });
  await browser.close();
}

export default globalSetup;