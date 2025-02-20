import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar filtros en la página de Verificaciones de Fraude", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer clic en "Verificaciones de Fraude"
    await test.step("Seleccionar Verificaciones de Fraude", async () => {
      const fraudVerificationLink = page.getByRole("link", { name: "Verificaciones de Fraude" });
      await expect(fraudVerificationLink).toBeVisible({ timeout: 10000 });
      await fraudVerificationLink.click();
    });

    // Paso 5: Validar que la página de Verificaciones de Fraude se cargó correctamente
    await test.step("Validar página Verificaciones de Fraude", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/campaigns/fraud_verify", { timeout: 10000 });
    });

    // Paso 6: Rellenar el campo "Desde" con fecha 1 de febrero de 2025
    await test.step("Seleccionar fecha Desde", async () => {
      const desdeInput = page.getByRole('textbox', { name: 'Desde' });
      await expect(desdeInput).toBeVisible({ timeout: 10000 });
      await desdeInput.fill("2025-02-01"); // Formato de fecha YYYY-MM-DD
    });

    // Paso 7: Rellenar el campo "Hasta" con la fecha actual
    await test.step("Seleccionar fecha Hasta", async () => {
      const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hastaInput).toBeVisible({ timeout: 10000 });
      const currentDate = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato YYYY-MM-DD
      await hastaInput.fill(currentDate);
    });

    // Paso 8: Hacer clic en el botón "Buscar"
    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible({ timeout: 10000 });
      await buscarButton.click();
    });

    // Paso 9: Seleccionar el checkbox correspondiente
    await test.step("Seleccionar checkbox de la campaña", async () => {
      const checkbox = page.getByRole('row', { name: '🎁Carro | Haz 6 viajes entre' }).getByRole('checkbox');
      await expect(checkbox).toBeVisible({ timeout: 10000 });
      await checkbox.click(); // Seleccionar el checkbox
    });

    // Paso 10: Hacer clic en el botón "Verificar"
    await test.step("Hacer clic en el botón Verificar", async () => {
      const verificarButton = page.getByRole('button', { name: 'Verificar' });
      await expect(verificarButton).toBeVisible({ timeout: 10000 });
      await verificarButton.click(); // Hacer clic en el botón
    });

    // Paso 11: Confirmar la acción en el modal
    await test.step("Confirmar acción en el modal", async () => {
      const confirmButton = page.getByRole('button', { name: 'Confirmar' });
      await expect(confirmButton).toBeVisible({ timeout: 10000 });
      await confirmButton.click(); // Hacer clic en el botón "Confirmar" en el modal
    });

    // Paso 12: Validar que hemos sido redirigidos a la página correcta
    await test.step("Validar redirección a la página de resumen de verificación", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/campaigns/verification_summary.html", { timeout: 10000 });
    });
  });
});
