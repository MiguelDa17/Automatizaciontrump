import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator(".cursor-pointer"); // Nuevo selector basado en la inspección
  const menuVisible = page.locator("#mysidenav"); // Ajustar si no es el correcto

  console.log("🔍 Verificando visibilidad del botón del menú...");
  await menuButton.waitFor({ state: "attached", timeout: 15000 });

  console.log("✅ Botón del menú encontrado.");
  await menuButton.scrollIntoViewIfNeeded();
  await menuButton.hover(); // Hover antes del clic
  console.log("🖱️ Haciendo clic en el botón del menú...");
  await menuButton.click();

  console.log("⏳ Esperando a que el menú aparezca...");
  await menuVisible.waitFor({ state: "attached", timeout: 5000 }).catch(() => {
    console.log("⚠️ El menú no se cargó en el DOM. Verifica el selector.");
  });

  if (!(await menuVisible.isVisible())) {
    console.log("⚠️ Menú no visible. Intentando nuevamente...");
    await page.waitForTimeout(1000);
    await menuButton.click();
  }

  console.log("✅ Verificando si el menú lateral es visible...");
  await expect(menuVisible).toBeVisible({ timeout: 15000 }).catch(() => {
    throw new Error("❌ El menú lateral nunca apareció.");
  });

  console.log("✅ Menú lateral abierto correctamente.");
}
