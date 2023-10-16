import  express  from "express";

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleur
import { getAllUsers } from "../controlleur/userController.js";

//route /users pour obtenir les liste des utilisateurs
userRouteur.get('/users',(req,res) => {
        getAllUsers(req,res)
})