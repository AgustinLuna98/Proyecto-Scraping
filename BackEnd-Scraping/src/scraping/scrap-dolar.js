import puppeteer from "puppeteer";
import connection from "../db.js";

// Función para obtener la información de los dólares
async function GetDolarhoy() {
    const browser = await puppeteer.launch({
        headless: "new",
    });
    const page = await browser.newPage();

    await page.goto("https://dolarhoy.com");

    const dolares = await page.evaluate(() => {
        const currentDate = new Date().toISOString();// Obtener fecha actual en formato ISO
        const AllDolars = document.querySelectorAll('.tile.is-parent.is-7.is-vertical');
        const tempDiv = document.createElement('div');

        // Recorremos cada nodo en AllDolars y agregamos su contenido HTML a tempDiv
        AllDolars.forEach(node => {
            tempDiv.innerHTML += node.innerHTML;
        });

        // Buscamos todos los elementos con la clase "tile is-child" dentro de tempDiv
        const tiles = tempDiv.querySelectorAll('.tile.is-child');

        // Creamos un array para almacenar los resultados
        const dolares = [];

        // Iteramos sobre cada elemento y extraemos la información relevante
        tiles.forEach(tile => {
            // Verificamos si el elemento .title existe antes de intentar acceder a su contenido
            const titleElement = tile.querySelector('.title');
            const title = titleElement ? titleElement.textContent.trim() : ''; // Título del dólar

            // Verificamos si el elemento .compra y .venta existen antes de intentar acceder a su contenido
            const compraElement = tile.querySelector('.compra .val');
            const compra = compraElement ? compraElement.textContent.trim().replace('$', '') : ''; // Valor de compra
            const ventaElement = tile.querySelector('.venta .val');
            const venta = ventaElement ? ventaElement.textContent.trim().replace('$', '') : ''; // Valor de venta

            // Añadimos la información al array de dolares
            dolares.push({
                Fecha_Actualizacion: currentDate,
                Titulo: title,
                Compra: compra,
                Venta: venta
            });
        });

        return dolares;
    });

    await browser.close();
    return dolares;
}

async function actualizarDBConDolares(dolares) {
    try {
        // Eliminar datos anteriores
        connection.query('DELETE FROM dolar');
        // Reiniciar el contador de autoincremento
        connection.query('ALTER TABLE dolar AUTO_INCREMENT = 1');
        // Insertar nuevos datos
        for (const dolar of dolares) {
            connection.query('INSERT INTO dolar (Fecha_Actualizacion, Titulo, Compra, Venta) VALUES (?, ?, ?, ?)', [dolar.Fecha_Actualizacion, dolar.Titulo, dolar.Compra, dolar.Venta]);
        }

        console.log("Base de datos actualizada con éxito.");
    } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        throw error;
    }
}

async function iniciarProceso() {
    try {
        const dolares = await GetDolarhoy(); // Obtener información de los dólares
        await actualizarDBConDolares(dolares); // Actualizar la base de datos con la información obtenida
    } catch (error) {
        console.error('Error durante el proceso:', error);
    }
}
async function obtenerDolaresDB() {
    return new Promise((resolve, reject) => {
        // Realizar la consulta a la tabla dolar
        const query = 'SELECT * FROM dolar';
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error al obtener los datos de la base de datos:', error);
                reject(error);
            }
            // Resolver la promesa con los resultados
            resolve(results);
        });
    });
}


export { GetDolarhoy, iniciarProceso, obtenerDolaresDB };
