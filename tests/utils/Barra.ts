import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator("#ham-menu");
  const menuVisible = page.locator("#mysidenav");

  console.log("🖥️ Resolución actual:", await page.evaluate(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  })));

  console.log("🔍 Verificando si el botón del menú existe...");
  await expect(menuButton).toBeAttached({ timeout: 10000 });

  console.log("📏 Verificando si el botón está visible...");
  await expect(menuButton).toBeVisible({ timeout: 5000 });

  console.log("🖱️ Moviendo cursor hasta el botón del menú...");
  await menuButton.scrollIntoViewIfNeeded();
  await menuButton.hover();

  console.log("✅ Botón del menú encontrado. Probando si responde al clic...");
  await menuButton.click();

  console.log("⏳ Esperando a que el menú se abra...");
  try {
    await menuVisible.waitFor({ state: "visible", timeout: 7000 });
    console.log("✅ Menú lateral abierto correctamente.");
  } catch (error) {
    console.log("⚠️ Intentando forzar la apertura con otro clic...");
    await menuButton.click({ force: true });

    try {
      await menuVisible.waitFor({ state: "visible", timeout: 5000 });
      console.log("✅ Menú lateral abierto tras reintentar.");
    } catch (error) {
      throw new Error("❌ El menú no se abrió después de varios intentos.");
    }
  }
}
