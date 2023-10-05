import dotenv from "dotenv"
dotenv.config()
import mysql from "mysql"
export const connection = mysql.createConnection({
  host     : process.env.host,
  user     : process.env.user,
  password : process.env.password,
  database : process.env.database
});
  
connection.connect((err) => {
        if(err) throw err
        console.log("La base de données a demarré");
});