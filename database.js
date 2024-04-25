import mysql from "mysql2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

export async function addUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO 
      users (username, password)
      VALUES (?,?)
      `,
    [username, hashedPassword]
  );

  console.log("User Added ....");
  // console.log(result[0]);
  return result[0];
}

export async function getUser(username) {
  const [user] = await pool.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);

  return user[0];
}
