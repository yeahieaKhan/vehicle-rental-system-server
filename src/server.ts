import express, { Request, Response } from "express";
//postgres connection
import { Pool } from "pg";

import dotenv from "dotenv";
import path from "path";

import { userRouter } from "./modules/user.router";
import { initDB } from "./config/db";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());


initDB();
app.use("/users",userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
