import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const user = await userService.createUserDB(name, email);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user.rows
    });
  } catch (error: any) {
    console.error(error); // 🔥 see the real error in terminal
    res.status(500).json({
      success: false,
      message: "some error", // show actual DB error
    });
  }
};

export const createUsersController = {
  createUser,
};