import  express  from "express";

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleurs
import { getAllUser, getUserById, postUser, deleteUserById, loginUser, logoutUser } from '../controlleur/user.js'
import { auth } from "../middleware/auth.js";

//route get sur l'url /tasks pour obtenir toutes les taches
userRouteur.get('/users', (req, res) => {
    getAllUser(req, res);
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

//route /login pour se connecter
userRouteur.post('/login', (req, res) => {
    loginUser(req, res);
})