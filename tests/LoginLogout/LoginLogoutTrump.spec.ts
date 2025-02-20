import { test, expect } from "@playwright/test";

test.describe("Validar el login de trumpDev", () => {
  test("Completar el login con email y contraseña válidos", async ({ page }) => {
    // Paso 1: Navegar a la página de login
    await test.step("Abrir la página de TrumpDev", async () => {
      await page.goto("https://admin.picap.io/");
    });

    // Paso 2: Llenar los campos de email y contraseña
    await test.step("Llenar los campos de login", async () => {
      await page.locator('#username').fill("automatizador@gmail.com"); 
      await page.getByRole('textbox', { name: 'Contraseña' }).fill("Picap321"); 
    });

    // Paso 3: Hacer clic en el botón "Ingresar"
    await test.step("Hacer clic en el botón de login", async () => {
      await page.getByRole('button', { name: 'Ingresar' }).click();
    });

    // Paso 4: Esperar hasta que el dashboard cargue correctamente
    await test.step("Esperar hasta que el usuario esté autenticado", async () => {
      const mensajeBienvenida = page.getByRole('heading', { name: 'Bienvenido(a) a Trump' });
      await expect(mensajeBienvenida).toBeVisible({ timeout: 10000 }); // Aumentamos el timeout a 10s
    });

    // Paso 5: Hacer clic en la foto de perfil para abrir el menú de usuario (con reintento)
    await test.step("Abrir el menú de usuario", async () => {
      const fotoPerfil = page.getByRole('button', { name: 'Abrir menú de usuario' });

      await fotoPerfil.waitFor({ state: 'visible' }); // Esperar a que el botón esté visible
      await fotoPerfil.scrollIntoViewIfNeeded(); // Asegurar que esté en pantalla

      let intentos = 3;
      for (let i = 0; i < intentos; i++) {
        try {
          await fotoPerfil.click();
          await page.waitForTimeout(1000); // Pequeña espera para verificar si se abre el menú
          if (await page.getByRole('link', { name: 'Cerrar sesión' }).isVisible()) {
            break; // Si el menú se abrió correctamente, salir del bucle
          }
        } catch (error) {
          console.warn(`Intento ${i + 1} fallido al hacer clic en la foto de perfil.`);
          if (i === intentos - 1) throw error; // Si después de varios intentos sigue fallando, lanzar error
        }
      }
    });await page.locator('div').filter({ hasText: 'Automatizacion BdbdAbrir men' }).nth(2).click();
    await page.locator('#ham-menu').click();
    await page.getByText('Marketing y growth').click();

    // Paso 6: Hacer clic en "Cerrar sesión"
    await test.step("Hacer clic en cerrar sesión", async () => {
      const botonCerrarSesion = page.getByRole('link', { name: 'Cerrar sesión' });

      await botonCerrarSesion.waitFor({ state: 'visible' }); // Asegura que el botón sea visible
      await botonCerrarSesion.click();
    });

    // Paso 7: Validar que el usuario fue redirigido a la pantalla de login
    await test.step("Validar que el usuario cerró sesión", async () => {
      await expect(page.locator('#username')).toBeVisible({ timeout: 5000 }); // Validamos que regresó a la pantalla de login
    });
  });
});
