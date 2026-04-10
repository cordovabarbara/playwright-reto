import { test, expect } from '@playwright/test';

test('deberia completar el flujo de compra de zapatos exitosamente', async ({ page }) => {
  await page.goto('https://www.bon-bonite.com/');
  
  // Navegar a zapatos
  await page.getByRole('banner').getByRole('link', { name: 'Zapatos' }).click();
  await expect(page).toHaveURL(/zapatos-mujer/); //Validar que llego a la categoria
  
  // Seleccionar producto
  await page.locator('div:nth-child(19) > .bg-bb-product-gray > .relative').click();
  
  // Seleccionar talla
  await page.getByRole('button', { name: '39' }).click();
  
  // Agregar al carrito
  await page.getByRole('button', { name: 'Añadir al carrito' }).click();
  await expect(page.getByRole('link', { name: '1', exact: true })).toBeVisible(); // validar que el carrito tiene 1 product
  
  // Ir al carrito
  await page.getByRole('link', { name: '1', exact: true }).click();
  await expect(page).toHaveURL(/carrito/); // validar que llegó al carrito
  
  // Finalizar compra
  await page.getByRole('link', { name: 'Finalizar compra' }).click();
  await expect(page).toHaveURL(/finalizar-compra/); // validar que llegó al checkout
});