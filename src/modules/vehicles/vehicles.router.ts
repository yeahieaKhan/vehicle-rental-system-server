import express from "express";
import { createVehiclesController } from "./vehicles.controller";

const router = express.Router();
router.post("/", createVehiclesController.createVehicles);
router.get("/", createVehiclesController.allVehiclsController);
router.get("/:vehicleId", createVehiclesController.singleVehiclesController);
router.put("/:vehicleId", createVehiclesController.updateSingleVehiclesC);
router.delete("/:vehicleId", createVehiclesController.deleteVehicls);

export const vehicleRouter = router;
