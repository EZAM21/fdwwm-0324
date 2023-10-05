import {getAllUsers, getUserId, getTaskFromNameUser,editOneTasksById} from "./controlleur/taskControlleur.js"


//  getUserId();

// getTaskFromNameUser();

// getAllUsers();

// editOneTasksById (2,"boire de l'eau");


import  express  from "express";
//app est la variable qui contient mon serveur web
const app = express()

// import de routeur
import { taskRouteur } from "./routeur/taskRouteur.js";
app.use(taskRouteur)
// creation d'une route sur l'adress /
app.get('/', function (req, res) {
        //res est la variable qui contient la reponse envoyer au client,ici j'envoie du html avec Pierre dedans 
        res.send('<p> Pierre </p>') 
})
// creation d'une route sur l'adress /json
app.get('/json', function (req, res) {
        //ici je renvoie du json
        res.json({
                'prenom':'Jacques',
                'age':35
        })
          
})
//ajout d'une route sur /mon-api qui vas renvoyé une api sur naruto personalisé
import {customApiControlleur} from './controlleur/customControlleur.js'
app.get('/mon-api', function (req, res) {
        //fetch recuperer l'api naruto
         customApiControlleur(req,res)
})
//pour demarer le serveur
app.listen(5000,function(){
        console.log('Le serveur a demarré')

})



      
     
      