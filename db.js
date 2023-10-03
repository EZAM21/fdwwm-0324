console.log("Coucou les amis");

//Import du paquet mysql pour pouvoir l'utiliser ici
import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.dbname);



export const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'restful_api'
});
 
connection.connect((err) => {
        if(err) throw err
        console.log("ok");
});





// getAllUsers();



// getUserId();




// //test connexion
// db.connect((err) => {
//   //Si j'ai une erreur je l'affiche dans le terminal
//   if ((err) => {
//     throw err;
//   }
//   console.log("connected to dabatase")
  

// )});

// //get task data 
// const getAllTask =  => {

// }

// const getTaskFromNameUser = (id) 
