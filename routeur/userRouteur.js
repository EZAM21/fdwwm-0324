import  express  from "express";

// creation du routeur express
export const taskRouteur = express.Router()

//importer les controlleur
import { getAllUsers } from "../controlleur/userController.js";

//route /users pour obtenir les liste des utilisateurs
taskRouteur.get('/users',(req,res) => {
        getAllUsers(req,res)
})

//route du controller « getTaskById » qui prend en parametre l’id d’une tâche.
taskRouteur.get('/tasks/:id', (req, res) => {
        getTaskById(req, res);
})
    
//route du controller postTaskById 
taskRouteur.post('/tasks/:id', (req, res) => {
        postTaskById(req, res);
})
    
//route du controller deleteTaskById
taskRouteur.delete('/tasks/:id', (req, res) => {
        deleteTaskById(req, res);
})
    
//route du controller editTaskById
taskRouteur.put('/tasks/:id', (req, res) => {
        editTaskById(req, res);
})