import { test, expect } from "@playwright/test";
import { login } from "../utils/login";
import { Barra } from "../utils/Barra";

test.describe("Sub módulo Marketing y Growth", () => {
  test("Validar acceso y creación de regla para referidos", async ({ page }) => {
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

    // Paso 4: Poner el cursor sobre "Códigos promocionales"
    await test.step("Hover sobre Códigos Promocionales", async () => {
      await page.getByText("Códigos promocionales").first().hover();
    });

    // Paso 5: Hacer clic en "Reglas para referidos"
    await test.step("Seleccionar Reglas para Referidos", async () => {
      const reglasReferidos = page.getByText("Reglas para referidos");
      await expect(reglasReferidos).toBeVisible({ timeout: 5000 });
      await reglasReferidos.click();
    });

    // Paso 6: Validar que la URL sea la correcta
    await test.step("Validar URL", async () => {
      await expect(page).toHaveURL("https://admin.picap.io/referral_code_rules", { timeout: 10000 });
    });

    // Paso 7: Escribir el código en el campo "Nombre"
    await test.step("Ingresar código en el campo Nombre", async () => {
      const inputNombre = page.getByRole("textbox", { name: "Nombre" });
      await expect(inputNombre).toBeVisible({ timeout: 5000 });
      await inputNombre.fill("REFERIDOS-CARRO-BOG-MED-IBA-MARZO-2");
    });

    // Paso 8: Hacer clic en "Buscar"
    await test.step("Hacer clic en Buscar", async () => {
      const btnBuscar = page.getByRole("button", { name: "Buscar" });
      await expect(btnBuscar).toBeVisible({ timeout: 5000 });
      await btnBuscar.click();
    });

    // Paso 9: Esperar a que la búsqueda se muestre
    await test.step("Esperar a que se cargue la búsqueda", async () => {
      await page.waitForTimeout(3000); // Ajusta si hay un mejor indicador de carga
    });

    // Paso 10: Hacer clic en "Limpiar"
    await test.step("Hacer clic en Limpiar", async () => {
      const btnLimpiar = page.getByRole("button", { name: "Limpiar" });
      await expect(btnLimpiar).toBeVisible({ timeout: 5000 });
      await btnLimpiar.click();
    });

    // Paso 11: Hacer clic en "Nueva regla para referidos"
    await test.step("Hacer clic en Nueva regla para referidos", async () => {
      const btnNuevaRegla = page.getByRole("button", { name: "Nueva regla para referidos" });
      await expect(btnNuevaRegla).toBeVisible({ timeout: 5000 });
      await btnNuevaRegla.click();
    });

    // Paso 12: Esperar a que el formulario se muestre
    await test.step("Esperar a que el formulario se cargue", async () => {
      const inputCodigo = page.getByRole("textbox", { name: "Código identificador" });
      await expect(inputCodigo).toBeVisible({ timeout: 5000 });
    });

    // Paso 13: Llenar el campo "Código identificador"
    await test.step("Ingresar código identificador", async () => {
      const inputCodigo = page.getByRole("textbox", { name: "Código identificador" });
      await inputCodigo.fill("PRUEBA QA");
    });

    });
  });
