import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; // Importa la función de login
import { Barra } from "../utils/Barra"; // Importa la función para abrir la barra 

test.describe("Automatización de filtros con valores específicos", () => {
  test("Seleccionar valores en filtros y realizar búsqueda", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Seleccionar módulo Servicios
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
    });

    // Paso 4: Seleccionar submódulo Todos los Servicios
    await test.step("Seleccionar submódulo Todos los Servicios", async () => {
      const todosLosServicios = page.getByRole("link", { name: "Todos los servicios" });
      await expect(todosLosServicios).toBeVisible({ timeout: 10000 });
      await todosLosServicios.click();
    });

    // Esperar a que la página termine de cargar completamente antes de interactuar más
    await page.waitForLoadState('load');  // Espera a que la página esté completamente cargada

    // Paso 8: Seleccionar la ciudad (Cali)
    await test.step("Seleccionar ciudad Cali", async () => {
      const ciudadSelect = page.locator('#city');
      await expect(ciudadSelect).toBeVisible(); // Asegura que el select esté visible
      await ciudadSelect.selectOption({ label: 'Cali' }); // Selecciona la opción por su label
    });

    // Paso 10: Seleccionar el tipo de servicio (Carro)
    await test.step("Seleccionar tipo de servicio Carro", async () => {
      const servicioSelect = page.locator('#service_type');
      await expect(servicioSelect).toBeVisible(); // Asegura que el select esté visible
      await servicioSelect.selectOption({ label: 'Carro' }); // Selecciona la opción por su label
    });

    // Paso 11: Seleccionar el método de pago (Efectivo)
    await test.step("Seleccionar método de pago Efectivo", async () => {
      const metodoPagoSelect = page.locator('#payment_method');
      await expect(metodoPagoSelect).toBeVisible(); // Asegura que el select esté visible
      await metodoPagoSelect.selectOption({ label: 'Efectivo' }); // Selecciona la opción por su label
    });

    // Paso 12: Hacer clic en el botón Buscar
    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.locator('button', { hasText: 'Buscar' }); // Buscar el botón con el texto 'Buscar'
      await expect(buscarButton).toBeVisible(); // Asegura que el botón esté visible
      await buscarButton.click(); // Hace clic en el botón Buscar
    });

  });
});
