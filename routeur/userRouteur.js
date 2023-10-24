import  express  from "express";
import multer from "multer"

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleurs
import { getAllUser, getUserById, postUser, deleteUserById, loginUser, logoutUser, upload, uploadAvatar } from '../controlleur/user.js'
import { auth } from "../middleware/auth.js";

//route get sur l'url /tasks pour obtenir toutes les taches
userRouteur.get('/users', auth, (req, res) => {
    getAllUser(req, res);
})

//route get sur l'url /tasks/id pour obtenir une tache en fonction de son id
userRouteur.get('/users/:id', auth, (req, res) => {
    getUserById(req, res);
})

//route post sur /users pour poster un utilisateur
userRouteur.post('/users', auth, (req, res) => {
    postUser(req, res);
})

//route delete /users/id pour supprimer un utilisateur
userRouteur.delete('/users/:id', auth, (req, res) => {
    deleteUserById(req, res);
})

//route /login pour se connecter
userRouteur.post('/login', auth, (req, res) => {
    loginUser(req, res);
})

//route /logout pour se déconnecter
userRouteur.post('/logout', auth, (req, res) => {
    logoutUser(req, res);
})

//route /users/:id/avatar pour ajouter une image de profil
userRouteur.post('/users/:id/avatar', auth, upload.single('avatar'), (req, res) => {         
    uploadAvatar(req, res);   
}) 

//route /users/:id/avatar pour supprimer une image de profil
userRouteur.delete('/users/:id/avatar', auth, (req, res) => {         
    deleteAvatar(req, res);   
})

//route /users/:id/avatar pour obtenir une image de profil
userRouteur.get('/users/:id/avatar', auth, (req, res) => {         
    getAvatar(req, res);
})