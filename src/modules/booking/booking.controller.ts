import { Request, Response } from "express";
import { bookingServiceBD } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {

  try {

    const result = await bookingServiceBD.createBookingBD(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result
    });

  } catch (error:any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

export const createBookingController ={ 
    createBooking
}