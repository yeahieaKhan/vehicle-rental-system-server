import express from "express";
import { createVehiclesController } from "./vehicles.controller";

const router = express.Router();
router.post("/vehicles", createVehiclesController.createVehicles);
router.get("/vehicles", createVehiclesController.allVehiclsController);
router.get("/:id", createVehiclesController.singleVehiclesController);
router.put("/:id", createVehiclesController.updateSingleVehiclesC);
router.delete("/:id", createVehiclesController.deleteVehicls);

export const vehicleRouter = router;
