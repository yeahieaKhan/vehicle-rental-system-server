import express from "express";
import { createVehiclesController } from "./vehicles.controller";

const router = express.Router();
router.post("/", createVehiclesController.createVehicles);
router.get("/", createVehiclesController.allVehiclsController);
router.get("/:id", createVehiclesController.singleVehiclesController);
router.put("/:id", createVehiclesController.updateSingleVehiclesC);
router.delete("/:id", createVehiclesController.deleteVehicls);

export const vehicleRouter = router;
