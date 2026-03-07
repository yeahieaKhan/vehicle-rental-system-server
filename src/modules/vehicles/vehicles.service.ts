import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES ($1,$2,$3,$4,$5)  RETURNING * `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ],
  );
  return result;
};

// get all vehicles

const allVehiclesDB = async () => {
  const result = await pool.query(`SELECT * FROM vehicles ORDER BY id DESC`);
  return result;
};

// get single vehicle

const singleVehicle = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id =$1`, [
    vehicleId,
  ]);
  return result;
};

const updateSingleVehicles = async (
  vehicleId: string,
  payload: Record<string, unknown>,
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles
     SET 
       vehicle_name = $1,
       type = $2,
       registration_number = $3,
       daily_rent_price = $4,
       availability_status = $5
     WHERE id = $6
     RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      vehicleId,
    ],
  );

  return result;
};

const deleteVehicles = async (vehicleId: string) => {
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id= $1 RETURNING *`,
    [vehicleId],
  );
  return result;
};

export const vehicleService = {
  createVehicles,
  allVehiclesDB,
  singleVehicle,
  updateSingleVehicles,
  deleteVehicles,
};
