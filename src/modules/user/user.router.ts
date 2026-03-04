
import express from "express";
import { createUsersController } from "./user.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)
router.get("/:id", createUsersController.getSingleUser)
router.put("/:id", createUsersController.updatedUser)




export const userRouter = router;