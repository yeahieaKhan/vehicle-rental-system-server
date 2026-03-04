import { Request, Response } from "express";
import { createUserDB, userService } from "./user.service";

// create users

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    console.error(error);
    if (error.code === "23505") {
      // duplicate email/phone
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};



// get all users data
const getAllUser = async(req:Request,res:Response)=>{
try{
    const result = await userService.getallUser();
  res.status(200).json({
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




// updated single user

const updatedUser = async(req:Request,res:Response)=>{
  const{name,password,phone,role}= req.body;

  try{
    const result =await userService.updateSingleUserDb(name,password,phone,role,req.params.id as string);
        if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ success response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    // 🔴 server error
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }

}

// single user delete controller

const singleUserDelete = async (req: Request, res: Response) => {
  try {
    const id  = req.params.id;

    const result = await userService.deleteSingleUserDB(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};









export const createUsersController = {
  createUser,
  getAllUser,
  getSingleUser,
  updatedUser,
  singleUserDelete
};