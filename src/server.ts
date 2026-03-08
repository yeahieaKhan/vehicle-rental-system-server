import express, { Request, Response } from "express";
//postgres connection
import { Pool } from "pg";

import dotenv from "dotenv";
import path from "path";

import { initDB } from "./config/db";
import { userRouter } from "./modules/user/user.router";
import { vehicleRouter } from "./modules/vehicles/vehicles.router";
import { bookingRouter } from "./modules/booking/booking.router";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;

// parser
app.use(express.json());

initDB();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users/:userId", userRouter);
app.use("/api/v1/users/:id", userRouter);
app.use("/api/v1/users/:id", userRouter);

//
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/vehicles", vehicleRouter);
app.use("/api/v1/:vehicleId", vehicleRouter);
app.use("/api/v1/vehicles/:vehicleId", vehicleRouter);
app.use("/api/v1/vehicles/:vehicleId", vehicleRouter);




// booking

app.use("/booking", bookingRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
