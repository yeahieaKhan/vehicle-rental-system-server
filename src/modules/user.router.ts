import { createUsersController } from "./user.controller";
import express from "express";

const router = express.Router();
router.post("/", createUsersController.createUser)



export const userRouter = router;