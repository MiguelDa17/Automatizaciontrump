import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";

test.describe("Mover card de Cerrado a Reconsideración", () => {
  test("Realizar movimiento de card de Cerrado a Reconsideración", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await page.locator('#ham-menu').click();
    await Barra(page);
    await page.getByText('App', { exact: true }).click();
    await page.getByText('App', { exact: true }).click();
    await page.getByText('App', { exact: true }).click();

    // Paso 3: Seleccionar el módulo de "Servicios"
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
    });

    // Paso 4: Seleccionar submódulo PQRs
    await test.step("Seleccionar submódulo PQRs", async () => {
      const pqrs = page.getByRole("link", { name: "PQRs" });
      await expect(pqrs).toBeVisible({ timeout: 10000 });
      await pqrs.click();
    });

    // Paso 5: Esperar a que las tarjetas sean visibles
    await test.step("Esperar a que las tarjetas sean visibles", async () => {
      const cardCerrado = page.locator('div:nth-child(5) > div > a').first(); 
      const cardReconsideracion = page.locator('#pqrs_list > .grid > div:nth-child(4)'); 
      await expect(cardCerrado).toBeVisible({ timeout: 10000 });
      await expect(cardReconsideracion).toBeVisible({ timeout: 10000 });
    });

    // Paso 6: Mover la tarjeta de Cerrado a Reconsideración
    await test.step("Mover tarjeta Cerrado a Reconsideración", async () => {
      const cardCerrado = page.locator('div:nth-child(5) > div > a').first(); 
      const cardReconsideracion = page.locator('#pqrs_list > .grid > div:nth-child(4)'); 

      await cardCerrado.dragTo(cardReconsideracion);
      await page.waitForTimeout(3000);  // Espera adicional para que el DOM se actualice
    });

    // Paso 7: Verificar que el movimiento a Reconsideración fue exitoso
    await test.step("Verificar que el movimiento a Reconsideración fue exitoso", async () => {
      const cardReconsideracion = page.locator('#pqrs_list > .grid > div:nth-child(4)'); 
      await expect(cardReconsideracion).toContainText("Testeo 2Abierto hace 272 díasPropietario Ticket:Andres Susa");
    });
  });
});
