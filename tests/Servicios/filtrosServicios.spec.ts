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
    await page.waitForLoadState('load');  
    
});
});
