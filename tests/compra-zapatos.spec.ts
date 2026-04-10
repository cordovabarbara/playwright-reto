import { test, expect } from '@playwright/test';

test('deberia completar el flujo de compra de zapatos exitosamente', async ({ page }) => {
  await page.goto('https://www.bon-bonite.com/');
  
  // Manejar cookies si aparecen
  try {
    await page.getByRole('button', { name: 'Aceptar todo' }).click({ timeout: 5000 });
  } catch {
    // El popup no apareció, continuar
  }
  
  // Navegar directo al producto
  await page.goto('https://www.bon-bonite.com/producto/sandalia-de-tacon-en-cuero-papaya/');
  await page.waitForLoadState('networkidle');
  
  // Seleccionar talla
  await page.getByRole('button', { name: '39' }).click();
  await expect(page.getByRole('button', { name: 'Añadir al carrito' })).toBeEnabled();
  
  // Agregar al carrito
  await page.getByRole('button', { name: 'Añadir al carrito' }).click();
  await expect(page.getByRole('link', { name: '1', exact: true })).toBeVisible({ timeout: 10000 });
  
  // Ir al carrito
  await page.getByRole('link', { name: '1', exact: true }).click();
  await expect(page).toHaveURL(/carrito/);
  
  // Finalizar compra
  await page.getByRole('link', { name: 'Finalizar compra' }).click();
  await expect(page).toHaveURL(/finalizar-compra/);
});