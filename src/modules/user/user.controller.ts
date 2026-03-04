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

const getAllUser = async(req:Request,res:Response)=>{
try{
    const result = await userService.getallUser();
  res.status(500).json({
    success:true,
    message:"Get user successfully",
    data:result.rows
  })
}catch(error:any){
   res.status(500).json({
    success:true,
    message:"Something went wrong",
    
  })
}
}

// get single user data

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleuserDb(req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createUsersController = {
  createUser,
  getAllUser,
  getSingleUser
};