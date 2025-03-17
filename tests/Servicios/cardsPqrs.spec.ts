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

    // Paso 5: Hacer clic en el botón "Buscar"
    await test.step("Hacer clic en Buscar", async () => {
      const buscarBtn = page.getByRole("button", { name: "Buscar" });
      await expect(buscarBtn).toBeVisible({ timeout: 10000 });
      await buscarBtn.click();
    });

    // Paso 6: Esperar a que la tarjeta aparezca en la lista
    await test.step("Esperar la aparición de la tarjeta", async () => {
      await page.waitForSelector("a:has-text('Testeo 2')", { timeout: 15000 }); // Verifica si el texto coincide
    });

    // Paso 7: Mover la card "Testeo 2" a Reconsideración
    await test.step("Mover card de Cerrado a Reconsideración", async () => {
      const cardCerrado = page.locator("a:has-text('Testeo 2')").first();
      const columnaReconsideracion = page.locator("#pqrs_list > .grid > div:nth-child(4)"); // Ajusta si es necesario

      await expect(cardCerrado).toBeVisible({ timeout: 10000 });
      await expect(columnaReconsideracion).toBeVisible({ timeout: 10000 });

      // Realizar el drag and drop
      await cardCerrado.hover();
      await page.mouse.down(); // Click sostenido
      await columnaReconsideracion.hover();
      await page.mouse.up(); // Soltar en "Reconsideración"

      await page.waitForTimeout(3000); // Espera para ver reflejado el cambio
    });

    // Paso 8: Verificar que la card se movió a Reconsideración
    await test.step("Verificar que la card está en Reconsideración", async () => {
      const cardReconsideracion = page.locator("#pqrs_list > .grid > div:nth-child(4)");
      await expect(cardReconsideracion).toContainText("Testeo 2");
    });
  });
});
