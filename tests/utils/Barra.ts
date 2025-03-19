import { Page, expect } from "@playwright/test";

/**
 * Abre el menú lateral si no está visible.
 * @param page - Instancia de Playwright Page
 */
export async function Barra(page: Page) {
  const menuButton = page.locator(".bg-pic-purple-light > .cursor-pointer");
  const menuVisible = page.locator(".sidenav-class"); // Ajusta la clase según sea necesario

  // Esperar hasta que el botón del menú esté visible antes de hacer clic
  await expect(menuButton).toBeVisible({ timeout: 20000 });

  // Asegurar que el botón esté en la vista antes de hacer clic
  await menuButton.scrollIntoViewIfNeeded();

  // Hacer clic en el botón para abrir el menú
  await menuButton.click();
  await page.waitForTimeout(1500); // Espera por la animación

  // Verificar si el menú se abrió, si no, hacer un segundo clic
  if (!(await menuVisible.isVisible())) {
    await menuButton.waitFor({ state: "visible", timeout: 5000 }); // Esperar si el botón desaparece momentáneamente
    await menuButton.click();
  }

  // Esperar hasta que el menú esté completamente visible
  await expect(menuVisible).toBeVisible({ timeout: 10000 });
}