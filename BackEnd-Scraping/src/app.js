import express from "express";
import morgan from "morgan";
import connection from './db.js';
import dotenv from 'dotenv';
import cors from 'cors'

import router from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});

app.use(router);