import { pool } from "../../config/db";

const createBookingBD = async (payload: Record<string, unknown>) => {

  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price 
     FROM vehicles 
     WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicle.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicleData = vehicle.rows[0];

  // calculate days
  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);

  const totalDays =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const totalPrice = totalDays * vehicleData.daily_rent_price;

  const booking = await pool.query(
    `INSERT INTO bookings
     (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
  );

  return {
    ...booking.rows[0],
    vehicle: {
      vehicle_name: vehicleData.vehicle_name,
      daily_rent_price: vehicleData.daily_rent_price
    }
  };
};




const getAllBooking = async ()=>{
    const result = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
    return result;
}


export const bookingServiceBD ={
    createBookingBD,
    getAllBooking,
}