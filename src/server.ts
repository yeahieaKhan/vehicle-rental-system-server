import express, { Request, Response } from "express";
//postgres connection
import { Pool } from "pg";

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());

// pool create
const pool = new Pool({
  connectionString: process.env.CONNECTION_STR,
});
// create db

const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email VARCHAR(250) UNIQUE NOT NULL,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )`);
};

initDB();

//Router
app.get("/", (req: Request, res: Response) => {
  res.send("Next level!");
});

app.post("/", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
