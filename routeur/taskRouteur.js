import  express  from "express";
import { auth } from "../middleware/auth.js";

// creation du routeur express
export const taskRouteur = express.Router()

//importer les controlleurs
import { getAlltask, getTaskById, postTaskById, deleteTaskById, editTaskById } from "../controlleur/taskController.js";

//route /users pour obtenir les listes des utilisateurs
taskRouteur.get('/task/:id', auth, (req,res) => {
        getAlltask(req,res)
})

//route du controller « getTaskById » qui prend en parametre l’id d’une tâche.
taskRouteur.get('/tasks/:id', auth, (req, res) => {    
        getTaskById(req, res);
    })
    
    //route du controller postTaskById 
    taskRouteur.post('/tasks/:id', auth, (req, res) => {
        postTaskById(req, res);
    })
    
    //route du controller deleteTaskById
    taskRouteur.delete('/tasks/:id',auth, (req, res) => {
        deleteTaskById(req, res);
    })
    
    //route du controller editTaskById
    taskRouteur.put('/tasks/:id', auth, (req, res) => {
        editTaskById(req, res);
    })