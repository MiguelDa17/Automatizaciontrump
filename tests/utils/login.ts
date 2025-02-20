import { Page, expect } from "@playwright/test";

// Función reutilizable para login
export async function login(page: Page) {
  await page.goto("https://admin.picap.io/");
  await page.locator("#username").fill("automatizador@gmail.com");
  await page.getByRole("textbox", { name: "Contraseña" }).fill("Picap321");
  await page.getByRole("button", { name: "Ingresar" }).click();

  // Validar que el login fue exitoso
  await expect(page.getByRole("heading", { name: "Bienvenido(a) a Trump" })).toBeVisible({ timeout: 10000 });
}
