import  express  from "express";
import multer from "multer"

// creation du routeur express
export const userRouteur = express.Router()

//importer les controlleurs
import { getAllUser, getUserById, postUser, deleteUserById, updateUserById, loginUser, logoutUser, upload, uploadAvatar } from '../controlleur/user.js'
import { auth } from "../middleware/auth.js";

/**
 * @api {get} /users GET all users
 * @apiDescription Get current user from the database
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 0.2.23
**/
//route get sur l'url /tasks pour obtenir toutes les taches
userRouteur.get('/users', auth, (req, res) => {
    getAllUser(req, res);
})




/**
 * @api {get} /users/:id GET user by id
 * @apiDescription Get current user from the database
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID  
 * 
 */
//route get sur l'url /tasks/id pour obtenir une tache en fonction de son id
userRouteur.get('/users/:id', auth, (req, res) => {
    getUserById(req, res);
})



/**
 * @api {post} /users POST user
 * @apiDescription Get current user from the database
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiBody {String} [nom] Users unique nom
 * @apiBody {Number} [age] Users unique age
 * @apiBody {String} email Users unique email
 * @apiBody {String} password Users unique password
 * 
 * @apiParamExample {json} Request-Example:
    {
        "nom": "Jojo",
        "age": 21,
        "email": "jojo@jojo.com",
        "password": "123456"
    }   
 * 
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
    {
        "id": 18,
        "nom": "Jojo",
        "age": 21,
        "email": "jojo@jojo.com",
        "password": "$2b$10$r.lyNyvG1R1d8yfQsRmkAOPQ5Cm/LRNkixY16Rn5eCD6dESV1Qd/."
    }
 */
//route post sur /users pour poster un utilisateur
userRouteur.post('/users', auth, (req, res) => {
    postUser(req, res);
})



/**
 * @api {delete} /users/:id DELETE user by id
 * @apiDescription Get current user from the database
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 */
//route delete /users/id pour supprimer un utilisateur
userRouteur.delete('/users/:id', auth, (req, res) => {
    deleteUserById(req, res);
})



/**
 * @api {patch} /users/:id PATCH user by id
 * @apiDescription Get current user from the database
 * @apiName PatchUser
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 * @apiBody {String} [nom] Users unique nom
 * @apiBody {Number} [age] Users unique age
 * @apiBody {String} [email] Users unique email
 * @apiBody {String} [password] Users unique password
 * 
 */
userRouteur.patch('/users/:id', auth, (req, res) => {
    updateUserById(req, res);
})



/**
 * @api {post} /login POST login
 * @apiDescription Get current user from the database
 * @apiName PostLogin
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiBody {String} email Users unique email
 * @apiBody {String} password Users unique password
 * 
 * @apiParamExample {json} Request-Example:
    {
        "email":"jojo@jojo.com",
        "password" : "123456"
    }
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
    {
    "user": {
        "id": 18,
        "nom": "Jojo",
        "age": 21,
        "email": "jojo@jojo.com",
        "password": "$2b$10$r.lyNyvG1R1d8yfQsRmkAOPQ5Cm/LRNkixY16Rn5eCD6dESV1Qd/.",
        "avatar": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1IiwiaWF0IjoxNjk3NTM3NDQ0fQ.J4VdXehHq3s990-i2rYkpS2xIc-JDcAw2UeFLTycyWE"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1IiwiaWF0IjoxNjk3NTM3NDQ0fQ.J4VdXehHq3s990-i2rYkpS2xIc-JDcAw2UeFLTycyWE"
    }
 *   
 */
//route /login pour se connecter
userRouteur.post('/login', auth, (req, res) => {
    loginUser(req, res);
})



/**
 * @api {post} /logout POST logout
 * @apiDescription Get current user from the database
 * @apiName PostLogout
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 */
//route /logout pour se déconnecter
userRouteur.post('/logout', auth, (req, res) => {
    logoutUser(req, res);
})



/**
 * @api {post} /users/:id/avatar POST avatar
 * @apiDescription Get current user from the database
 * @apiName PostAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 * @apiBody {File} avatar Users unique avatar
 */
//route /users/:id/avatar pour ajouter une image de profil
userRouteur.post('/users/:id/avatar', auth, upload.single('avatar'), (req, res) => {         
    uploadAvatar(req, res);   
}) 



/**
 * @api {delete} /users/:id/avatar DELETE avatar
 * @apiDescription Get current user from the database
 * @apiName DeleteAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 * 
 */
//route /users/:id/avatar pour supprimer une image de profil
userRouteur.delete('/users/:id/avatar', auth, (req, res) => {         
    deleteAvatar(req, res);   
})



/**
 * @api {get} /users/:id/avatar GET avatar
 * @apiDescription Get current user from the database
 * @apiName GetAvatar
 * @apiGroup User
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Users unique ID
 */
//route /users/:id/avatar pour obtenir une image de profil
userRouteur.get('/users/:id/avatar', auth, (req, res) => {         
    getAvatar(req, res);
})