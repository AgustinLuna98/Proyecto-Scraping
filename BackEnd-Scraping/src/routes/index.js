import { Router } from "express";
import { GetDolarhoy, iniciarProceso, obtenerDolaresDB } from "../scraping/scrap-dolar.js";
import { GetTemporadaRegular } from "../scraping/scrap-lec-lol.js";
const router = Router()

router.get('/api/dolares/actualizar', async (req, res) => {
    try {
        await iniciarProceso();
        res.send('Actualizacion de dolares exitosa')
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar los dolares.' });
    }
});

router.get('/api/dolares', async (req, res) => {
    try {
        const dolares = await GetDolarhoy();
        res.json(dolares);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la información de los dólares.' });
    }
});

router.get('/api/dolaresDB', async (req, res) => {
    try {
        const dolares = await obtenerDolaresDB();
        res.json(dolares);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la información de los dólares.' });
    }
});

router.get('/api/rankTeams-lec', async (req, res) => {
    try {
        const rankTeams = await GetTemporadaRegular();
        res.json(rankTeams);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la información de los dólares.' });
    }
});

export default router;
