import express, { Request, Response } from "express";
//postgres connection
import { Pool } from "pg";

import dotenv from "dotenv";
import path from "path";

import { initDB } from "./config/db";
import { userRouter } from "./modules/user/user.router";
import { vehicleRouter } from "./modules/vehicles/vehicles.router";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());

initDB();
app.use("/users", userRouter);
app.use("/users", userRouter);
app.use("/users/:id", userRouter);
app.use("/users/:id", userRouter);
app.use("/users/:id", userRouter);

//
app.use("/api/v1", vehicleRouter);
app.use("/api/v1", vehicleRouter);
app.use("/api/v1/:id", vehicleRouter);
app.use("/vehicles/:id", vehicleRouter);
app.use("/vehicles/:id", vehicleRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
