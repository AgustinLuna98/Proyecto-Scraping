import puppeteer from "puppeteer";

async function GetTemporadaRegular() {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();

    await page.goto("https://lolesports.com/standings/lec/lec_winter_2024/regular_season");

    const rankTeams = await page.evaluate(() => {
        const ranking = document.querySelectorAll('.ranking');

        // Creamos un array para almacenar los resultados
        const rankTeams = [];

        // Iteramos sobre cada elemento y extraemos la información relevante
        ranking.forEach(team => {
            // Verificamos si el elemento .title existe antes de intentar acceder a su contenido
            const ordinalElement = team.querySelector('.ordinal');
            const ordinal = ordinalElement ? ordinalElement.textContent.trim() : ''; // Título del dólar

            // Verificamos si el elemento .compra y .venta existen antes de intentar acceder a su contenido
            const nameElement = team.querySelector('.name');
            const name = nameElement ? nameElement.textContent.trim() : ''; // Valor de compra
            const recordElement = team.querySelector('.record');
            const record = recordElement ? recordElement.textContent.trim() : ''; // Valor de venta

            // Añadimos la información al array de dolares
            rankTeams.push({
                ordinal: ordinal,
                name: name,
                record: record
            });
        });

        return rankTeams;
    });

    await browser.close();
    return rankTeams;
}

export { GetTemporadaRegular };