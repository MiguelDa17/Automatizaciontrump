import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Validación de códigos promocionales", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Poner el cursor sobre "Códigos promocionales"
    await test.step("Hover sobre Códigos Promocionales", async () => {
      const promoCodes = page.getByText("Códigos promocionales").first();
      await expect(promoCodes).toBeVisible({ timeout: 10000 });
      await promoCodes.hover();
    });

    // Paso 5: Hacer clic en el enlace "Códigos promocionales" y esperar la navegación
    await test.step("Seleccionar Códigos Promocionales", async () => {
      const promoCodesLink = page.getByRole("link", { name: "Códigos promocionales" });
      await expect(promoCodesLink).toBeVisible({ timeout: 10000 });
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }),
        promoCodesLink.click(),
      ]);
    });

    // Paso 6: Validar que la página cargó completamente con espera adicional
    await test.step("Esperar la carga completa de la página", async () => {
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(15000); // Espera adicional de 15 segundos
    });

    // Paso 7: Ingresar la fecha "Desde" - 2025-03-10
    await test.step("Ingresar fecha Desde", async () => {
      const desdeInput = page.getByRole("textbox", { name: "Desde" });
      await expect(desdeInput).toBeVisible({ timeout: 10000 });
      await desdeInput.fill("2025-03-10");
    });

    // Paso 8: Ingresar la fecha "Hasta" - 2025-03-15
    await test.step("Ingresar fecha Hasta", async () => {
      const hastaInput = page.getByRole("textbox", { name: "Hasta" });
      await expect(hastaInput).toBeVisible({ timeout: 10000 });
      await hastaInput.fill("2025-03-15");
    });

    // Paso 9: Hacer clic en el botón de búsqueda
    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole("button", { name: "Buscar" });
      await expect(buscarButton).toBeVisible({ timeout: 10000 });
      await buscarButton.click();
    });
  });
});
