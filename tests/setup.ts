import { chromium } from '@playwright/test';
import fs from 'fs';

async function globalSetup() {
  // Si ya existe el archivo no lo regenera
  if (fs.existsSync('cookies.json')) return;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.bon-bonite.com/');
  
  // Esperar el popup y aceptar
  await page.getByRole('button', { name: 'Aceptar todo' }).click();
  
  await page.context().storageState({ path: 'cookies.json' });
  await browser.close();
}

export default globalSetup;