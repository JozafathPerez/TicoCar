import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

async function verifyCedula(pId) {
  console.log('Iniciando verificación de cédula para ID:', pId);

  let cedula = "0";
  let nombreCompleto = "0";
  let fechaNacimiento = "0";
  let nacionalidad = "0";

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('Navegando al sitio web...');
    await page.goto('https://servicioselectorales.tse.go.cr/chc/consulta_cedula.aspx');

    console.log('Llenando el formulario...');
    await page.type('#txtcedula', pId);
    await page.click('#btnConsultaCedula');

    console.log('Esperando a que se cargue la página de resultados...');
    await page.waitForSelector('#lblcedula', { timeout: 10000 });

    console.log('Obteniendo resultados...');
    cedula = await page.$eval('#lblcedula', el => el.textContent.trim());
    nombreCompleto = await page.$eval('#lblnombrecompleto', el => el.textContent.trim());
    fechaNacimiento = await page.$eval('#lblfechaNacimiento', el => el.textContent.trim());
    nacionalidad = await page.$eval('#lblnacionalidad', el => el.textContent.trim());

    console.log('Resultados obtenidos:', cedula, nombreCompleto, fechaNacimiento, nacionalidad);

    await browser.close();
  } catch (error) {
    console.error('Error durante la verificación:', error);
  }

  return `${cedula},${nombreCompleto},${fechaNacimiento},${nacionalidad}`;
}

export default verifyCedula;