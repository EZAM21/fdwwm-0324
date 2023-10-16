import  express  from "express";

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleur
import { getAllUsers } from "../controlleur/userController.js";

//route /users pour obtenir les liste des utilisateurs
userRouteur.get('/users',(req,res) => {
        getAllUsers(req,res)
})

//route du controller « getTaskById » qui prend en parametre l’id d’une tâche.
userRouteur.get('/tasks/:id', (req, res) => {
        getTaskById(req, res);
})
    
//route du controller postTaskById 
userRouteur.post('/tasks/:id', (req, res) => {
        postTaskById(req, res);
})
    
//route du controller deleteTaskById
userRouteur.delete('/tasks/:id', (req, res) => {
        deleteTaskById(req, res);
})
    
//route du controller editTaskById
userRouteur.put('/tasks/:id', (req, res) => {
        editTaskById(req, res);
})