import { test, expect } from "@playwright/test";
import { login } from "../utils/login"; 
import { Barra } from "../utils/Barra";

test.describe("Validación de Onboarding Dashboard", () => {
  test("Validar la página y sus respectivos filtros", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo Onboarding para desplegar el menú
    await page.getByText('Onboarding', { exact: true }).click();

    // Paso 4: Esperar a que aparezca el enlace "Onboarding Dashboard"
    await page.waitForSelector('text=Onboarding dashboard', { state: 'visible' });

    // Paso 5: Hacer clic en Onboarding Dashboard
    await page.getByRole('link', { name: 'Onboarding dashboard' }).click();

    // Paso 6: Esperar a que la nueva URL cargue
    await page.waitForURL("https://admin.picap.io/onboarding_dashboard", { timeout: 5000 });

    // Paso 7: Validar que la página cargó correctamente
    await expect(page).toHaveURL("https://admin.picap.io/onboarding_dashboard");
  });
});
