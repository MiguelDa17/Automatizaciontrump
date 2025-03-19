import { Page, expect } from "@playwright/test";

/**
 * Abre el menú lateral si no está visible.
 * @param page - Instancia de Playwright Page
 */
export async function Barra(page: Page) {
  const menuButton = page.locator(".bg-pic-purple-light > .cursor-pointer");
  const menuVisible = page.locator(".sidenav-class"); // Ajusta la clase del menú

  console.log("🔍 Verificando visibilidad del botón del menú...");

  // Esperar a que el botón del menú sea visible antes de hacer clic
  await menuButton.waitFor({ state: "attached", timeout: 15000 }).catch(() => {
    throw new Error("❌ El botón del menú no está presente en la página.");
  });

  console.log("✅ Botón del menú encontrado.");

  // Asegurar que el botón esté en la vista antes de hacer clic
  await menuButton.scrollIntoViewIfNeeded();

  console.log("🖱️ Haciendo clic en el botón del menú...");
  await menuButton.click();
  await page.waitForTimeout(2000); // Esperar animación

  console.log("🔍 Verificando si el menú se abrió...");
  if (!(await menuVisible.isVisible())) {
    console.log("⚠️ Menú no visible. Intentando nuevamente...");
    await menuButton.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
      throw new Error("❌ El botón del menú desapareció antes de hacer clic.");
    });

    await menuButton.click();
  }

  console.log("✅ Verificando si el menú lateral es visible...");
  await expect(menuVisible).toBeVisible({ timeout: 15000 }).catch(() => {
    throw new Error("❌ El menú lateral nunca apareció.");
  });

  console.log("✅ Menú lateral abierto correctamente.");
}
