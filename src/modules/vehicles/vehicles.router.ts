import express from "express";
import { createVehiclesController } from "./vehicles.controller";

const router = express.Router();
router.post("/", createVehiclesController.createVehicles);
router.get("/", createVehiclesController.allVehiclsController);
router.get("/:id", createVehiclesController.singleVehiclesController);

export const vehicleRouter = router;
