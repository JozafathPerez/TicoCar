import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

async function verifyPlate(plate) {
  console.log('Iniciando verificación de infracciones para placa:', plate);

  let tieneInfraccionesPendientesOCondenadas = false;

  try {
    const browser = await puppeteer.launch({
      headless: false, // Cambia a true en producción
      args: ['--disable-blink-features=AutomationControlled']
    });
    const page = await browser.newPage();

    console.log('Navegando al sitio web...');
    await page.goto('https://www.csv.go.cr/consulta-infracciones-publica', { waitUntil: 'networkidle2' });

    console.log('Esperando a que el campo de entrada esté disponible...');
    await page.waitForSelector('input[id*="mainForm:j_idt17"]', { timeout: 20000 });

    console.log('Llenando el formulario...');
    await page.evaluate((plate) => {
      const inputElement = document.querySelector('input[id*="mainForm:j_idt17"]');
      if (inputElement) {
        inputElement.value = plate;
        document.querySelector('button[id*="mainForm:j_idt41"]').click();
      } else {
        throw new Error('No se encontró el campo de entrada para la placa');
      }
    }, plate);

    console.log('Esperando a que se cargue la página de resultados...');
    await page.waitForSelector('tbody[id*="mainForm:j_idt46_data"]', { timeout: 20000 });

    console.log('Obteniendo resultados...');
    tieneInfraccionesPendientesOCondenadas = await page.evaluate(() => {
      const rows = document.querySelectorAll('tbody[id*="mainForm:j_idt46_data"] tr');
      return Array.from(rows).some(row => {
        const estado = row.querySelector('td:nth-child(5)').innerText.trim();
        return estado === 'PENDIENTE' || estado === 'CONDENADA';
      });
    });

    console.log('Resultados obtenidos:', tieneInfraccionesPendientesOCondenadas);

    await browser.close();
  } catch (error) {
    console.error('Error durante la verificación:', error);
    // Depuración adicional
    if (page) await page.screenshot({ path: 'error_screenshot.png' });
  }

  return tieneInfraccionesPendientesOCondenadas ? 'Tiene infracciones pendientes o condenadas' : 'No tiene infracciones pendientes ni condenadas';
}

export default verifyPlate;
