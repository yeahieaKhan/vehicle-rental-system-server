import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STR,
  ssl: {
    rejectUnauthorized: false, // ✅ must for Neon DB
  },
});

// Initialize DB tables
export const initDB = async () => {
  try {
    const result = await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Users table checked/created successfully");
    return result;
  } catch (error) {
    console.error("Error initializing DB:", error);
    throw error;
  }
};