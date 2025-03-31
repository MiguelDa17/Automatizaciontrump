import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; // 
import { Barra } from "../utils/Barra";

test.describe("Navegación al módulo de Todos los Servicios", () => {
  test("Acceder a la sección de Todos los Servicios", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

   // Paso 2: Abrir el menú lateral
      await Barra(page);


    // Paso 3: Esperar a que "Servicios" sea interactuable y hacer clic
    await test.step("Seleccionar módulo Servicios", async () => {
      const servicios = page.getByText("Servicios", { exact: true });
      await expect(servicios).toBeVisible({ timeout: 10000 });
      await servicios.click();
    });

    // Paso 4: Hacer clic en "Todos los Servicios"
    await test.step("Seleccionar submódulo Todos los Servicios", async () => {
      const todosLosServicios = page.getByRole("link", { name: "Todos los servicios" });
      await expect(todosLosServicios).toBeVisible({ timeout: 10000 });
      await todosLosServicios.click();
    });

    // Paso 5: Validar que la página se cargó correctamente verificando la URL
    await test.step("Validar carga de la página de Todos los Servicios", async () => {
      const expectedUrl = 'https://admin.picap.io/bookings';
      await expect(page).toHaveURL(expectedUrl, { timeout: 10000 }); // Esperamos hasta 10s para que la URL se cargue
    });
  });
});
