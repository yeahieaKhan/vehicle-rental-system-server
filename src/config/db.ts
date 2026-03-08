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


// booking table

await pool.query(`
  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,

    customer_id INT NOT NULL,
    vehicle_id INT NOT NULL,

    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,

    total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),

    status VARCHAR(20) DEFAULT 'active' 
    CHECK (status IN ('active','cancelled','returned')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_customer
        FOREIGN KEY(customer_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_vehicle
        FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE,

    CHECK (rent_end_date > rent_start_date)
);
  `)

    console.log("DATABASE Connected & Tables Ready ✅");
  } catch (error) {
    console.error("Error initializing DB:", error);
    throw error;
  }
};