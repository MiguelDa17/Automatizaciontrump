import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/temp";

test.describe("Validación de códigos promocionales", () => {
  test("Validar la página y sus respectivas funciones", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en "Marketing y growth"
    await page.getByText("Marketing y growth").click();

    // Paso 4: Poner el cursor sobre "Códigos promocionales"
    await page.getByText("Códigos promocionales").first().hover();

    // Paso 5: Hacer clic en el enlace "Campañas promocodes" y esperar la navegación
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.getByRole("link", { name: "Campañas promocodes" }).click(),
    ]);

    // Paso 6: Validar que la URL sea la correcta
    await expect(page).toHaveURL("https://admin.picap.io/promo_code_campaigns", { timeout: 10000 });

    // Paso 7: Ingresar el nombre "ACTIVAR COD MICRO-INFL" en el campo "Nombre"
    await page.getByRole("textbox", { name: "Nombre" }).fill("ACTIVAR COD MICRO-INFL");

    // Paso 8: Hacer clic en el botón "Buscar"
    await page.getByRole("button", { name: "Buscar" }).click();

    // Paso 9: Hacer clic en la fila correspondiente a "ACTIVAR COD MICRO-INFL"
    await page.getByRole("row", { name: "ACTIVAR COD MICRO-INFL" }).getByRole("link").click();

    // Paso 10: Hacer clic en el botón "Guardar Cambios"
    await page.getByRole("button", { name: "Guardar Cambios" }).click();
  });
});
