import  express  from "express";

// creation du routeur express
export const taskRouteur = express.Router()

//importer les controlleur
import { getAllUsers } from "./../controlleur/taskControlleur.js";

//route /users pour obtenir les liste des utilisateurs
taskRouteur.get('/users',(req,res) => {
        getAllUsers(req,res)
})