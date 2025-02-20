import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Automatizar filtros con fechas, tipo de solicitud y ver detalle de la card", () => {
  test("Ingresar fechas, seleccionar tipo de solicitud, realizar búsqueda y ver detalles de la card", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

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

    // Paso 5: Ingresar las fechas en los filtros
    await test.step("Ingresar fechas en los filtros", async () => {
      // Ingresar la fecha 'Desde' como 30 enero 2025
      const desde = page.getByRole('textbox', { name: 'Desde' });
      await expect(desde).toBeVisible();
      await desde.fill("2025-01-30");

      // Ingresar la fecha 'Hasta' como la fecha actual
      const hasta = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hasta).toBeVisible();
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      await hasta.fill(todayFormatted);
    });

    // Paso 6: Seleccionar el tipo de solicitud
    await test.step("Seleccionar tipo de solicitud", async () => {
      const tipoSolicitud = page.locator('#type_of_request_cd');
      await expect(tipoSolicitud).toBeVisible();

      // Usamos selectOption en vez de click para seleccionar la opción
      await tipoSolicitud.selectOption({ label: 'Problemas con la entrega' });
    });

    // Paso 7: Dar click en el botón "Buscar"
    await test.step("Dar click en el botón Buscar", async () => {
      const buscarButton = page.getByRole('button', { name: 'Buscar' });
      await expect(buscarButton).toBeVisible();
      await buscarButton.click();
    });

    // Paso 8: Hacer click en uno de los resultados de búsqueda
    await test.step("Seleccionar una de las búsquedas", async () => {
      const resultado = page.getByRole('link', { name: 'Testeo Vane 2025004 Abierto' });
      await expect(resultado).toBeVisible({ timeout: 10000 });
      await resultado.click();
    });
  });
});

