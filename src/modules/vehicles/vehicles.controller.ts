import { Request, Response } from "express";
import { pool } from "../../config/db";
import { vehicleService } from "./vehicles.service";


const createVehicles = async (req: Request, res: Response) => {
  try {
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


export const createVehiclesController = {
    createVehicles
}