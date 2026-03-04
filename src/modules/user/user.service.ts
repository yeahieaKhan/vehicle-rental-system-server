import { pool } from "../../config/db";


// Type-safe payload
interface IUserPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "customer" | "admin";
}

export const createUserDB = async (payload: IUserPayload) => {
  const { name, email, password, phone, role = "customer" } = payload;

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role`,
    [name, email.toLowerCase(), password, phone, role]
  );

  return result.rows[0]; // clean object
};


const getallUser = async()=>{
    const result = await pool.query(`SELECT * FROM users ORDER BY id DESC`);
    return result
}


// get single user data

const getSingleuserDb =async (id:string)=>{
    const result  = await pool.query( `SELECT * FROM users WHERE id=$1`,[id]);
    return result;
}


// update user information


const updateSingleUserDb = async (name:string,password:string,phone:string,role:string,id:string)=>{
   
    const result = await pool.query(`
        UPDATE users SET name=$1, password=$2,phone=$3,role=$4  WHERE id= $5 RETURNING * 
        `,[name,password,phone,role,id]);

        return result;
}







export const userService ={
    createUserDB,
    getallUser,
    getSingleuserDb,
    updateSingleUserDb
}