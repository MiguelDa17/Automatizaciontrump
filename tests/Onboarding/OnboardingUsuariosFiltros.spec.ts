import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";

test.describe("Validación de Onboarding Dashboard", () => {
  test("Validar la página, filtros y exportación de listado", async ({ page }) => {
    // Aumentar el timeout a 60 segundos para este test
    test.setTimeout(60000);

    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo Onboarding para desplegar el menú
    await page.getByText('Onboarding', { exact: true }).click();

    // Paso 4: Esperar a que aparezca el enlace "Usuarios onboarding"
    await page.waitForSelector('text= Usuarios onboarding', { state: 'visible' });

    // Paso 5: Hacer clic en Onboarding Usuarios
    await page.getByRole('link', { name: 'Usuarios onboarding' }).click();

    // Paso 6: Esperar a que la nueva URL cargue
    await page.waitForURL("https://admin.picap.io/onboardings", { timeout: 15000 });


    // Paso 7: Validar que la página cargó correctamente
    await expect(page).toHaveURL("https://admin.picap.io/onboardings");

    // Paso 8: Seleccionar país (Colombia)
    await test.step("Seleccionar país Colombia", async () => {
      const paisSelect = page.locator('#country');
      await expect(paisSelect).toBeVisible();
      await paisSelect.selectOption({ label: 'Colombia' });
    });

    // Paso 9: Seleccionar ciudad (Armenia) usando el teclado
    await test.step("Seleccionar ciudad Armenia usando teclado", async () => {
      const ciudadSelect = page.locator('#city');
      await expect(ciudadSelect).toBeVisible();

      // Hacemos clic en el campo de ciudad para enfocarlo
      await ciudadSelect.click();

      // Simulamos presionar la letra 'A' para filtrar la ciudad
      await page.keyboard.press('A');

      // Ahora presionamos 'Enter' para seleccionar (por ejemplo, Bogotá)
      await page.keyboard.press('Enter');
    });

    // Paso 10: Seleccionar tipo de vehículo
    await test.step("Seleccionar tipo de vehículo", async () => {
      const vehicleSelect = page.locator('#vehicle_type');
      await expect(vehicleSelect).toBeVisible();
      await vehicleSelect.selectOption({ label: 'Carro' }); 
    });

    // Paso 11: Hacer clic en el botón "Buscar"
    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
    });

    // Paso 12: Esperar 15 segundos para que la búsqueda se refleje
    await test.step("Esperar 15 segundos para que la búsqueda se refleje", async () => {
      await page.waitForTimeout(15000); // Esperamos 15 segundos
    });

    // Paso 13: Hacer clic en el botón "Exportar listado"
    await test.step("Hacer clic en el botón Exportar listado", async () => {
      const exportButton = page.getByRole('link', { name: 'Exportar listado' });
      await expect(exportButton).toBeVisible();
      await exportButton.click();
    });
  });
});
