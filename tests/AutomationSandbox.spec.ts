import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Acciones en el automation Sandbox', () => {

        test('Click en Boton ID Dinamica', async ({ page }) => {

            await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
                await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');

            })

            await test.step('Puedo hacer click en el boton con ID Dinamico', async () => {
                await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
                const botonIDDinamico = page.getByRole('button', { name:'Hace click para generar un ID dinamico y mostrar el elemento oculto'});
                await botonIDDinamico.click({ force: true});
                await botonIDDinamico.dblclick();
                await botonIDDinamico.click({ button: 'right' });
                await botonIDDinamico.click({modifiers: ['Shift']});
                await botonIDDinamico.hover();

                
            })
            

            
            
        })
        
    })
})();
