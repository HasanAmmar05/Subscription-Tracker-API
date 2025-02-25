import {config} from 'dotenv';

config({ path: `.env${process.env.NODE_ENV || 'development'}.local` });
export const { PORT = 5500, 
    NODE_ENV = 'development',
    DB_URI = 'mongodb+srv://Hasan05:Hf8a9vir3cZ9azz3@cluster0.ejzhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    JWT_SECRET = "secret", JWT_EXPIRES_IN = "1d"
 } = process.env;