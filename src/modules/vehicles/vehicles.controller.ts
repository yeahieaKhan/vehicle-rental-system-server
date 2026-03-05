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

// all vehicls router

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
  try {
    const result = await vehicleService.singleVehicle(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vehicle Reading",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error); // 👈 এটা যোগ করো

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createVehiclesController = {
  createVehicles,
  allVehiclsController,
  singleVehiclesController,
};
