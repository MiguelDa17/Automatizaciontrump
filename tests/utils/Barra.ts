import { Page, expect } from "@playwright/test";

/**
 * Abre el menú lateral si no está visible.
 * @param page - Instancia de Playwright Page
 */
export async function Barra(page: Page) {
  const menuButton = page.locator(".bg-pic-purple-light > .cursor-pointer");
  await expect(menuButton).toBeVisible({ timeout: 10000 });
  await menuButton.scrollIntoViewIfNeeded();
  
  // Hacer clic en el botón del menú
  await menuButton.click();

  // Esperamos un poco para dar tiempo a la animación
  await page.waitForTimeout(1500); 

  // Verificamos si el menú está visible, y si no, hacemos un segundo clic
  const menuVisible = page.locator(".sidenav-class"); // Ajusta la clase según sea necesario
  if (!(await menuVisible.isVisible())) {
    await menuButton.waitFor({ state: 'visible', timeout: 5000 }); // Espera antes de hacer clic
    await menuButton.click();
}
}