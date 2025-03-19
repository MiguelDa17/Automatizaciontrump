import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator("#ham-menu"); // Nuevo selector
  const menuVisible = page.locator("#mysidenav");

  console.log("🔍 Verificando si el botón del menú existe...");
  await menuButton.waitFor({ state: "attached", timeout: 10000 });

  console.log("✅ Botón del menú encontrado. Haciendo clic...");
  await menuButton.click();

  console.log("⏳ Esperando que el menú lateral aparezca...");
  const menuAppeared = await menuVisible.waitFor({ state: "attached", timeout: 5000 }).catch(() => false);

  if (!menuAppeared || !(await menuVisible.isVisible())) {
    console.log("⚠️ Menú no visible. Intentando un segundo clic...");
    await menuButton.click({ force: true });
  }

  console.log("✅ Verificando si el menú lateral es visible...");
  await expect(menuVisible).toBeVisible({ timeout: 10000 });

  console.log("✅ Menú lateral abierto correctamente.");
}
