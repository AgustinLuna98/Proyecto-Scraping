import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'db_personal'
};

export default dbConfig;