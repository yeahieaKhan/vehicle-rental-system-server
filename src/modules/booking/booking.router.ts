import express from "express";
import { createBookingController } from "./booking.controller";

const router = express.Router();


router.post("/", createBookingController.createBooking)
router.get("/", createBookingController.getAllBooking)





export const bookingRouter = router;
