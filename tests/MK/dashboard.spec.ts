import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Dashboard - Marketing y Growth", () => {
  test("Validar acceso a Dashboard y opciones en el select", async ({ page }) => {
    // Paso 1: Iniciar sesión
    await login(page);

    // Paso 2: Abrir el menú lateral
    await Barra(page);

    // Paso 3: Hacer clic en el módulo "Marketing y Growth"
    await test.step("Seleccionar módulo Marketing y Growth", async () => {
      const marketingModule = page.getByText("Marketing y growth");
      await expect(marketingModule).toBeVisible({ timeout: 10000 });
      await marketingModule.click();
    });

    // Paso 4: Hacer clic en "Dashboard"
    await test.step("Seleccionar Dashboard", async () => {
      const dashboardLink = page.getByRole("link", { name: "Dashboard", exact: true });
      await expect(dashboardLink).toBeVisible({ timeout: 10000 });
      await dashboardLink.click();
    });

    // Paso 5: Validar que la página se cargó correctamente
    await test.step("Validar página Dashboard", async () => {
      const dashboardHeading = page.getByRole("heading", { name: "Usuarios registrados" });
      await expect(dashboardHeading).toBeVisible({ timeout: 10000 });
    });

    // Paso 6: Seleccionar "Mes" en el select con locator '#graph'
    await test.step("Seleccionar 'Mes' en el select", async () => {
      const graphSelect = page.locator("#graph");
      await expect(graphSelect).toBeVisible({ timeout: 10000 });
      await graphSelect.selectOption({ label: "Mes" });
    });

    // Paso 7: Hacer clic en el botón "Ver" y validar que la URL es correcta
    await test.step("Hacer clic en el botón 'Ver' y validar la URL", async () => {
      const verButton = page.getByRole("link", { name: "Ver" }).getByRole("button");
      await expect(verButton).toBeVisible({ timeout: 10000 });
      await verButton.click();

      // Validar que la URL sea la esperada
      await expect(page).toHaveURL("https://admin.picap.io/campaigns", { timeout: 10000 });
    });
  });
});
