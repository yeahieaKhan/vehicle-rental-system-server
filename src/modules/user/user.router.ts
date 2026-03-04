
import express from "express";
import { createUsersController } from "./user.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)
router.get("/:id", createUsersController.getSingleUser)




export const userRouter = router;