import { Page, expect } from "@playwright/test";

export async function Barra(page: Page) {
  const menuButton = page.locator(".cursor-pointer"); // Selector basado en inspección
  const menuVisible = page.locator("#mysidenav"); // Ajustar si no es el correcto
  const closeButton = page.locator("#close-btn");

  console.log("🔍 Verificando visibilidad del botón del menú...");
  await menuButton.waitFor({ state: "attached", timeout: 15000 });

  console.log("✅ Botón del menú encontrado.");
  await menuButton.scrollIntoViewIfNeeded();
  await menuButton.hover();
  console.log("🖱️ Haciendo clic en el botón del menú...");
  await menuButton.click({ force: true });

  console.log("⏳ Esperando a que el menú aparezca...");
  await menuVisible.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
    console.log("⚠️ El menú no se hizo visible. Intentando nuevamente...");
  });

  if (!(await menuVisible.isVisible())) {
    console.log("⚠️ Menú aún no visible. Intentando clic nuevamente...");
    await page.waitForTimeout(1000);
    await menuButton.click({ force: true });
  }

  console.log("✅ Verificando si el menú lateral es visible...");
  await expect(menuVisible).toBeVisible({ timeout: 15000 }).catch(() => {
    throw new Error("❌ El menú lateral nunca apareció.");
  });

  console.log("📌 Interactuando con el menú...");
  const bienvenidoText = page.locator('div').filter({ hasText: 'Bienvenido(a) a Trump' }).nth(2);
  await bienvenidoText.click();
  await bienvenidoText.click({ button: 'right' });

  console.log("❎ Cerrando el menú...");
  await closeButton.waitFor({ state: "visible", timeout: 5000 });
  await closeButton.click();

  console.log("✅ Menú lateral cerrado correctamente.");
}
