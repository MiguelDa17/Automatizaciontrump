import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator("#ham-menu"); // Botón del menú
  const menuVisible = page.locator("#mysidenav"); // Menú lateral

  // Obtener y mostrar la resolución de pantalla en GitHub Actions
  const resolution = await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }));
  console.log(`🖥️ Resolución actual: ${resolution.width}x${resolution.height}`);

  console.log("🔍 Verificando si el botón del menú existe...");
  await menuButton.waitFor({ state: "attached", timeout: 10000 });

  console.log("🖱️ Moviendo cursor hasta el botón del menú...");
  await menuButton.scrollIntoViewIfNeeded();
  await menuButton.hover();

  console.log("✅ Botón del menú encontrado. Haciendo clic...");
  await menuButton.click();
  await page.waitForTimeout(1000); // Asegurar que no hay animaciones interrumpiendo

  console.log("⏳ Verificando si el menú se abrió...");
  const menuAppeared = await menuVisible.waitFor({ state: "visible", timeout: 5000 }).catch(() => false);

  if (!menuAppeared) {
    console.log("⚠️ Menú no visible. Intentando un segundo clic con 'force: true'...");
    await menuButton.hover();
    await menuButton.click({ force: true });
    await page.waitForTimeout(1000);
  }

  console.log("✅ Verificando si el menú lateral sigue visible...");
  await expect(menuVisible).toBeVisible({ timeout: 5000 });

  console.log("🔒 Asegurando que el menú no se cierre inmediatamente...");
  await page.waitForTimeout(2000);
  if (!(await menuVisible.isVisible())) {
    throw new Error("❌ El menú se cerró inesperadamente.");
  }

  console.log("✅ Menú lateral abierto correctamente.");
}
