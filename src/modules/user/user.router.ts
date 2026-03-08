
import express from "express";
import { createUsersController } from "./user.controller";
import { createVehiclesController } from "../vehicles/vehicles.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)
router.get("/:userId", createUsersController.getSingleUser)
router.put("/:userId", createUsersController.updatedUser)
router.delete("/:userId", createUsersController.singleUserDelete)




// vehicles router
router.post("/",createVehiclesController.createVehicles)


export const userRouter = router;