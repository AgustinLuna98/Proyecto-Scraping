// db.js
import mysql from 'mysql2'
import dbConfig from './config.js';

// Crea la conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conecta a la base de datos
connection.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;
    }
    console.log('Conexión exitosa a la base de datos MySQL.');
});

export default connection;