//import model user
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import multer from 'multer'//Librairie multer
import fs from 'fs'//Librairie fs
import {__dirname} from '../index.js'
import path from 'path'//Librairie path

//get User data - SELECT / READ of CRUD
export const getAllUser = async (req, res) => {
    try {
        //findAll() permet de récupérer tous les enregistrements de la table
        const users = await User.findAll();

        if(!users) {
            res.status(404).send('no users found')
        }

        res.status(200).send(users);
        
    } catch (error) {        
        res.send(error) 
    }
}

export const getUserById = async (req, res) => {
    try {
        
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        

        //get Task By Id  with the orm sequelize and find with where clause
        const user = await User.findAll({
            where: {
                id: id
            }
        }); 

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send(user);
    } catch (error) {
        res.send(error)
    }
}

export const postUser = async (req, res) => {
    try {

        //hash password - 10 fait référence au nombre de tour de hashage. On peut l'ajouter au fichier .env      
        const hashedPassword = await bcrypt.hash(req.body.password, 10);        

        const user = await User.create({
            nom: req.body.nom,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword
        });        

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send(user);
    } catch (error) {
        res.send(error)
    }
}

export const deleteUserById = async (req, res) => {
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        
                
        //Appeler la méthode de l’utilisateur pour supprimer toutes les tâches avec l’utilisateur actuel
        const countTasksDeleted = await User.destroyAllTask(id);        

        //obtenir Task By Id avec l’orm sequelize et trouver avec la clause where
        const user = await User.destroy({
            where: {
                id: id
            }
        }); 

        if(!user) {
            res.status(404).send('no users found')
        }

        res.status(200).send("user deleted and " + countTasksDeleted + " task deleted");
    } catch (error) { 
        res.send(error)
    }
}    


export const loginUser = async (req, res) => {
    try {
        //appel de la méthode verfifyCredtential pour checker si l'utilisateur existe en BDD
        const user = await User.verfifyCredtential(req)        

        //Si oui, génération du token via la méthode generateAuthToken
        const token = await User.generateAuthToken(user)

        //on ajoute dans les headers le token sous le champs "Authorization", il sera conservé côté client dans les cookies avec une durée de vie TTL
        res.setHeader('Authorization', token);    

        //le header Access-Control-Expose-Headers permet d'exposer le header Authorization
        res.setHeader('Access-Control-Expose-Headers', 'authorization');        
 
        res.send({ user, token })   
             
    } catch (error) {
        res.status(400).send('error with login')
    }
   
}

export const logoutUser = async (req, res) => {
    try {
        //on récupére le token dans le header de la requete
        const token = req.header('Authorization').replace('Bearer ', '')

        //on cherche l'utilisateur avec l'id et le token
        const user = await User.findOne({ 
            where: {
                id: req.user.id,
                token: token
            }
        })

        if (!user) {
            throw new Error()
        }

        //on supprime le token de l'utilisateur
        user.token = null;

        //on sauvegarde l'utilisateur en bdd
        await user.save()

        res.send('logout success')
    } catch (error) {
        res.status(500).send('error with logout')
    }
}

export const upload = multer({
    //Pour télécharger vers un dossier spécifique, le commenter pour le stocker dans la base de données
    dest: 'images',   
    //limiter la taille du fichier
    limits: {
        fileSize: 1000000
    },   
    //filter the type of file
    fileFilter(req, file, cb) {
        //si le fichier ne correspond pas au type, renvoyer une erreur
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('please upload an image'))
        }
        //si le fichier ne correspond pas au type, renvoyer une erreur
        cb(undefined, true)
    }
})

export const uploadAvatar = async (req, res) => {
    try {
        //get id user
        const id = req.params.id

        //get user by id
        const user = await User.findByPk(id)

        if(!user) throw 'no users found'
        
        //get file infos
        const path = req.file.path
        const extension = req.file.originalname.split('.')[1]        
             
        //on ajoute le chemin de l'image en base de donnée
        user.avatar = `${path}.${extension}`

        //on sauvegarde l'utilisateur en bdd
        await user.save()

        //on ajoute l'extension au nom du fichier avec filesystem
        fs.rename(path, `${path}.${extension}`, (err) => {
            if(err) throw err
        })

        res.status(200).send(user)
    } catch (error) {
        res.send(error)
    }
}


export const deleteAvatar = async (req, res) => {
    try {
        //get id user
        const id = req.params.id

        //get user by id
        const user = await User.findByPk(id)

        if(!user) throw 'no users found'

        //get user avatar sans extension
        const pathAvatar = user.avatar             

        //Supprimer une image
        fs.unlink(pathAvatar, (err) => {
            if(err) throw err
        })        
        
        //on supprime l'avatar 
        user.avatar = null

        //on sauvegarde l'utilisateur en bdd
        await user.save()

        res.status(200).send(user)
    } catch (error) {
        res.send(error)
    }
}


export const getAvatar = async (req, res) => {
    try {
        //get id user
        const id = req.params.id

        //get user by id
        const user = await User.findByPk(id)

        if(!user) throw 'no users found'

        //get user avatar sans extension
        const pathAvatar = user.avatar                   

        //send file
        const options = {
            root: path.join(__dirname)
        }      

        //send image file
        res.sendFile(pathAvatar, options, (err) => {
            if(err) throw err
            else console.log('image envoyée')
        })
    } catch (error) {
        res.send(error)
    }
}

//get User data - SELECT / Lire le CRUD
// export const getAllUsers = async (req, res) => {
//     try {
//         //findAll() permet de récupérer tous les enregistrements de la table
//         const users = await User.findAll();

//         if(!users) {
//             res.status(404).send('no users found')
//         }

//         res.status(200).send(users);
        
//     } catch (error) {        
//         res.send(error) 
//     }
// }

// export const getUserById = async (req, res) => {
//     try {
        
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id        

//         //get Task By Id  avec l'orm sequelize
//         const user = await User.findAll({
//             where: {
//                 id: id
//             }
//         }); 

//         if(!user) {
//             res.status(404).send('no users found')
//         }

//         res.status(200).send(user);
//     } catch (error) {
//         res.send(error)
//     }
// }

// export const postUser = async (req, res) => {
//     try {

//         //hash password - 10 fait référence au nombre de tour de hashage. On peut l'ajouter au fichier .env      
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);        

//         const user = await User.create({
//             nom: req.body.nom,
//             age: req.body.age,
//             email: req.body.email,
//             password: hashedPassword
//         });        

//         if(!user) {
//             res.status(404).send('no users found')
//         }

//         res.status(200).send(user);
//     } catch (error) {
//         res.send(error)
//     }
// }

// export const deleteUserById = async (req, res) => {
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id        
                
//         //Méthode pour supprimer un user
//         const countTasksDeleted = await User.destroyAllTask(id);        

//         //get Task By Id  avec l'orm sequelize
//         const user = await User.destroy({
//             where: {
//                 id: id
//             }
//         }); 

//         if(!user) {
//             res.status(404).send('no users found')
//         }

//         res.status(200).send("user deleted and " + countTasksDeleted + " task deleted");
//     } catch (error) { 
//         res.send(error)
//     }
// }    


// export const loginUser = async (req, res) => {
//     try {
//         //on récupére l'id de la tache dans l'url
//         const email = req.body.email
//         const password = req.body.password

//         //get Task By Id  avec l'orm sequelize
//         const user = await User.findAll({
//             where: {
//                 email: email
//             }
//         }); 
        
//         const isMatch = await bcrypt.compare(password, user[0].password);

//         if(!isMatch) {
//             res.status(404).send('bad mdp user')
//         }else{
//             res.status(200).send(user);
//         }
              
             
//     } catch (error) {
//         res.status(400).send('error with login')
//     }
   
// }