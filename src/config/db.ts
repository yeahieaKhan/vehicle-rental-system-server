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
    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(20) UNIQUE NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Vehicles Table
 await pool.query(`
  CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(250) NOT NULL,
    type VARCHAR(20) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    daily_rent_price INT,
    availability_status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  )
`);

    console.log("DATABASE Connected & Tables Ready ✅");
  } catch (error) {
    console.error("Error initializing DB:", error);
    throw error;
  }
};