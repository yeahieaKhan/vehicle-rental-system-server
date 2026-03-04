
import express from "express";
import { createUsersController } from "./user.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)
router.get("/:id", createUsersController.getSingleUser)
router.put("/:id", createUsersController.updatedUser)
router.delete("/:id", createUsersController.singleUserDelete)




export const userRouter = router;