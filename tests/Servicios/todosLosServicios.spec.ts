import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; // Importamos la función de login

test.describe("Navegación al módulo de Todos los Servicios", () => {
  test("Acceder a la sección de Todos los Servicios", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Asegurar que el menú lateral está visible antes de hacer clic
    await test.step("Abrir menú lateral", async () => {
      const menuButton = page.locator(".bg-pic-purple-light > .cursor-pointer");
      await expect(menuButton).toBeVisible({ timeout: 10000 }); // Espera hasta 10s
      await menuButton.scrollIntoViewIfNeeded();
      
      // Primer clic
      await menuButton.click();

      // Esperamos un poco para dar tiempo a la animación
      await page.waitForTimeout(1500); // Puedes ajustar el tiempo

      // Verificamos si el menú está visible, y si no, forzamos el segundo clic
      const menuVisible = page.locator('.sidenav-class'); // Reemplaza '.sidenav-class' con la clase que indica que el menú está abierto
      if (!(await menuVisible.isVisible())) {
        await menuButton.click(); // Segundo clic si no está visible
      }
    });

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
