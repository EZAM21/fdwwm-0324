import  express  from "express";

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleur
import { getAllUsers } from "../controlleur/user.js";

//route /users pour obtenir les liste des utilisateurs
userRouteur.get('/users',(req,res) => {
        getAllUsers(req,res)
})

//route get sur l'url /tasks/id pour obtenir une tache en fonction de son id
userRouteur.get('/users/:id', (req, res) => {
    getUserById(req, res);
})

//route post sur /users pour poster un utilisateur
userRouteur.post('/users', (req, res) => {
    postUser(req, res);
})

//route delete /users/id pour supprimer un utilisateur
userRouteur.delete('/users/:id', (req, res) => {
    deleteUserById(req, res);
})