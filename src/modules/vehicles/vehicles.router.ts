
import express from "express";
import { createVehiclesController } from "./vehicles.controller";


const router = express.Router();
router.post("/", createVehiclesController.createVehicles)







export const vehicleRouter = router;