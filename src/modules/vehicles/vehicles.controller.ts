import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleService } from "./vehicles.service";

// const createVehicles = async (req: Request, res: Response) => {
//   const {email}= req.body;

//   try {

//         // check if user already exists
//     const existingUser = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );

//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const result = await vehicleService.createVehicles(req.body);

//     return res.status(201).json({
//       success: true,
//       message: "Vehicle created successfully",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// all vehicls router

const createVehicles = async (req: Request, res: Response) => {
  const { registration_number } = req.body;

  try {
    const existingVehicle = await pool.query(
      "SELECT * FROM vehicles WHERE registration_number = $1",
      [registration_number],
    );

    if (existingVehicle.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already exists",
      });
    }

    const result = await vehicleService.createVehicles(req.body);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const allVehiclsController = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.allVehiclesDB();
    res.status(200).json({
      success: true,
      message: "Vechicls Reading",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const singleVehiclesController = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehicleService.singleVehicle(vehicleId as string);

    res.status(200).json({
      success: true,
      message: "Vehicle Reading",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateSingleVehiclesC = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;

    const result = await vehicleService.updateSingleVehicles(
      vehicleId as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0],
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteVehicls = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehicleService.deleteVehicles(vehicleId as string);
    res.status(200).json({
      success: true,
      message: "Vehicls Delete successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const createVehiclesController = {
  createVehicles,
  allVehiclsController,
  singleVehiclesController,
  updateSingleVehiclesC,
  deleteVehicls,
};
