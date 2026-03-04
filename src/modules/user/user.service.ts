import { pool } from "../../config/db";



const createUserDB = async (name:string,email:string) => {
    const result = await pool.query(`INSERT INTO  users (name,email) VALUES ($1,$2) RETURNING *`, [name, email]);
    return result;
}


const getallUser = async()=>{
    const result = await pool.query(`SELECT * FROM users ORDER BY id DESC`);
    return result
}


// get single user data

const getSingleuserDb =async (id:string)=>{
    const result  = await pool.query( `SELECT * FROM users WHERE id=$1`,[id]);
    return result;
}


export const userService ={
    createUserDB,
    getallUser,
    getSingleuserDb
}