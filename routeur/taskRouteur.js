import  express  from "express";

// creation du routeur express
export const taskRouteur = express.Router()

//importer les controlleur
import { getTaskById } from "../controlleur/taskController.js";

//route /users pour obtenir les liste des utilisateurs
taskRouteur.get('/task/:id',(req,res) => {
        getTaskById(req,res)
})