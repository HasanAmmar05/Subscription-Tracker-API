import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.development.local");

dotenv.config({ path: envPath });

export const {
  PORT = process.env.PORT || 5500,
  NODE_ENV = process.env.NODE_ENV || "development",
  DB_URI = "mongodb+srv://Hasan05:Hf8a9vir3cZ9azz3@cluster0.ejzhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  JWT_SECRET = "secret",
  JWT_EXPIRES_IN = "1d",
  ARCJET_ENV = process.env.ARCJET_ENV || "development",
  ARCJET_KEY = process.env.ARCJET_KEY || "ajkey_01jmxfracwfzft9j82p8krtha7",
  QSTASH_TOKEN = process.env.QSTASH_TOKEN || 'eyJVc2VySUQiOiI5MjIwZWVhYy01YjJhLTQ1OTAtYjZiZS05ODIwMWQ3MDEwNzMiLCJQYXNzd29yZCI6IjlmNzM4MDM1ZDcwYjRiMzg5YzI4NTA4NzY4ZTU4MjM3In0=',
  QSTASH_URL = process.env.QSTASH_URL || 'https://qstash.upstash.io',
  SERVER_URL = process.env.SERVER_URL || "http://localhost:5500",
  EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "zqwavrayhvfkwqpy",
} = process.env;
