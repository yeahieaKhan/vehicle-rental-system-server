
import express from "express";
import { createUsersController } from "./user.controller";
import { createVehiclesController } from "../vehicles/vehicles.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)
router.get("/:id", createUsersController.getSingleUser)
router.put("/:id", createUsersController.updatedUser)
router.delete("/:id", createUsersController.singleUserDelete)




// vehicles router
router.post("/",createVehiclesController.createVehicles)


export const userRouter = router;