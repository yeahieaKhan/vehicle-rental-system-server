
import express from "express";
import { createUsersController } from "./user.controller";

const router = express.Router();
router.post("/", createUsersController.createUser)
router.get("/", createUsersController.getAllUser)



export const userRouter = router;