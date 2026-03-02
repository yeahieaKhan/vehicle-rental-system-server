import express, { Request, Response } from "express";
//postgres connection

import { Pool } from "pg";

const app = express();
const port = 5000;

// pool create
const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_Mwk54ncZezfb@ep-spring-king-ainwm931-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Next level!");
});

app.post("/", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
