
import express from "express";
import { createVehiclesController } from "./vehicles.controller";


const router = express.Router();
router.post("/", createVehiclesController.createVehicles)
router.get("/", createVehiclesController.allVehiclsController)







export const vehicleRouter = router;