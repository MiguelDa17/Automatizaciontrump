import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar filtros en la página de Campañas", async ({ page }) => {
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

    // Paso 4: Hacer clic en "Campañas"
    await test.step("Seleccionar Campañas", async () => {
      const campaignsLink = page.getByRole("link", { name: "Campañas" });
      await expect(campaignsLink).toBeVisible({ timeout: 10000 });
      await campaignsLink.click();
    });

    // Paso 5: Validar que la página de Campañas se cargó correctamente
    await test.step("Validar página Campañas", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/campaigns", { timeout: 10000 });
    });

    // Paso 6: Completar los filtros de fecha
    await test.step("Seleccionar fecha 'Desde' y 'Hasta'", async () => {
      // Seleccionar fecha 'Desde' (1 Febrero 2025)
      const desdeInput = page.getByRole('textbox', { name: 'Desde' });
      await expect(desdeInput).toBeVisible({ timeout: 10000 });
      await desdeInput.fill('2025-02-01'); // Fecha 1 Febrero 2025

      // Seleccionar fecha 'Hasta' (fecha actual)
      const hastaInput = page.getByRole('textbox', { name: 'Hasta' });
      await expect(hastaInput).toBeVisible({ timeout: 10000 });
      const currentDate = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
      await hastaInput.fill(currentDate);
    });

    // Paso 7: Seleccionar estado 'Activa' con teclado
    await test.step("Seleccionar estado 'Activa' con teclado", async () => {
      const campaignStatusSelect = page.locator('#campaign_status');
      await expect(campaignStatusSelect).toBeVisible({ timeout: 10000 });
      await campaignStatusSelect.click(); // Hacemos click para desplegar el menú

      // Usamos el teclado para presionar 'A' y luego 'Enter' para seleccionar "Activa"
      await campaignStatusSelect.press('A'); // Presionamos 'A'
      await campaignStatusSelect.press('Enter'); // Confirmamos con Enter
    });

    // Paso 8: Hacer clic en el botón Buscar
    await test.step("Hacer clic en el botón Buscar", async () => {
      const buscarButton = page.locator('#campaign_status');
      await expect(buscarButton).toBeVisible({ timeout: 10000 });
      await buscarButton.click(); // Hacer clic en Buscar
    });

    // Paso 9: Hacer clic en el enlace "🎁Carro | Haz 5 viajes entre"
    await test.step("Seleccionar enlace '🎁Carro | Haz 5 viajes entre'", async () => {
      const carroLink = page.getByRole("link", { name: "🎁Carro | Haz 5 viajes entre" }).first();
      await expect(carroLink).toBeVisible({ timeout: 10000 });
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // Esperamos a que se abra una nueva pestaña
        carroLink.click(), // Hacemos click en el enlace
      ]);
      // Validamos que la nueva pestaña tiene la URL esperada
      await expect(newPage).toHaveURL("https://admin.picap.io/campaigns/67d48a539da40000274d8165");
    });
  });
});