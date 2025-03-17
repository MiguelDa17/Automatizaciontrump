import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";

test.describe("Validación de códigos promocionales", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en "Marketing y growth"
    await page.getByText('Marketing y growth').click();

    // Paso 4: Poner el cursor sobre "Códigos promocionales"
    await page.getByText('Códigos promocionales').first().hover();

    // Paso 5: Hacer clic en el enlace "Códigos promocionales" y esperar la navegación
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.getByRole('link', { name: 'Códigos promocionales' }).click(),
    ]);

    // Paso 6: Validar que la URL sea la correcta
    await expect(page).toHaveURL('https://admin.picap.io/promo_codes', { timeout: 10000 });

    // Paso 7: Ingresar la fecha "Desde" - 2025-03-10
    await page.getByRole('textbox', { name: 'Desde' }).fill('2025-03-10');

    // Paso 8: Ingresar la fecha "Hasta" - 2025-03-15
    await page.getByRole('textbox', { name: 'Hasta' }).fill('2025-03-15');

    // Paso 9: Hacer clic en el primer enlace dentro de la fila con la fecha especificada
    await page.getByRole('row', { name: 'Marzo 13 2025 06:14 -05 Marzo' })
      .getByRole('link')
      .nth(2)
      .click();

    // Paso 10: Hacer clic en el botón "Cancelar" dentro del formulario
    await page.getByRole('button', { name: 'Cancelar' }).click();
  });
});
