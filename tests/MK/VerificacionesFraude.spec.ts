import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  const URL_FRAUDE = "https://admin.picap.io/campaigns/fraud_verify";
  
  test("Validar filtros en la página de Verificaciones de Fraude", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo "Marketing y Growth"
    const marketingModule = page.getByText("Marketing y growth");
    await expect(marketingModule).toBeVisible({ timeout: 10000 });
    await marketingModule.click();

    // Paso 4: Hacer clic en "Verificaciones de Fraude"
    const fraudVerificationLink = page.getByRole("link", { name: "Verificaciones de Fraude" });
    await expect(fraudVerificationLink).toBeVisible({ timeout: 10000 });
    await fraudVerificationLink.click();

    // Paso 5: Validar que la página de Verificaciones de Fraude se cargó correctamente
    await expect(page).toHaveURL(URL_FRAUDE, { timeout: 10000 });

    // Paso 6: Rellenar el campo "Desde" con fecha 1 de febrero de 2025
    const desdeInput = page.getByRole('textbox', { name: 'Desde' });
    await expect(desdeInput).toBeVisible({ timeout: 10000 });
    await desdeInput.fill("2025-02-01");

    // Paso 7: Rellenar el campo "Hasta" con la fecha actual
    const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
    await expect(hastaInput).toBeVisible({ timeout: 10000 });
    const currentDate = new Date().toISOString().split('T')[0];
    await hastaInput.fill(currentDate);

    // Paso 8: Hacer clic en el botón "Buscar"
    const buscarButton = page.getByRole('button', { name: 'Buscar' });
    await expect(buscarButton).toBeVisible({ timeout: 10000 });
    await buscarButton.click();

  });
});
