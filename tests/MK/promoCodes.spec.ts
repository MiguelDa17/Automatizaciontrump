import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";

test.describe("Validación de codigos promocionales", () => {
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

    // Paso 9: Ingresar el código "MEDUSA"
    await page.getByRole('textbox', { name: 'Código' }).fill('MEDUSA');

    // Paso 10: Hacer clic en el botón "Buscar"
    await page.getByRole('button', { name: 'Buscar' }).click();

    // Paso 11: Hacer clic en la fila correspondiente a "MEDUSA"
    await page.getByRole('row', { name: 'Marzo 10 2025 00:00 -05 Marzo 16 2025 23:59 -05 MEDUSA •Disponible' })
      .getByRole('link')
      .nth(1)
      .click();

    // Paso 12: Escribir "prueba QA" en el input dentro del modal
    await page.locator('#promo_code_modal input[type="text"]').fill('prueba QA');

    // Paso 13: Escribir "prueba QA" en el textarea de push notification
    await page.locator('#push_notification').fill('prueba QA');


    // Paso 14: Asegurar que el botón "Cancelar" está disponible antes de hacer clic
    await page.getByRole('button', { name: 'Cancelar' }).waitFor();
    await page.getByRole('button', { name: 'Cancelar' }).click();

    // Paso 15: Asegurar que el botón "Limpiar" está disponible antes de hacer clic
    await page.getByRole('button', { name: 'Limpiar' }).waitFor();
    await page.getByRole('button', { name: 'Limpiar' }).click();
  });
});