// import {getTaskFromNameUser, editOneTasksById, getTaskById, } from "./controlleur/taskController.js"
// import {getAllUsers, getUserId} from "./controlleur/userController.js"



//  getUserId();

// getTaskFromNameUser();

// getAllUsers();

// editOneTasksById ("");


// import  express  from "express";
// //app est la variable qui contient mon serveur web
// const app = express()


// // app.set('views', './../controlleur/views')
// // app.set('view engine', 'ejs')


// // import de routeur
// import { taskRouteur } from "./routeur/userRouteur.js";
// app.use(taskRouteur)
// // creation d'une route sur l'adress /
// app.get('/', function (req, res) {
//         //res est la variable qui contient la reponse envoyer au client,ici j'envoie du html avec Pierre dedans 
//         res.send('<p> Johan</p>') 
// })
// // creation d'une route sur l'adress /json
// app.get('/json', function (req, res) {
//         //ici je renvoie du json
//         res.json({
//                 'prenom':'Jacques',
//                 'age':35
//         })
          
// })
// //ajout d'une route sur /mon-api qui vas renvoyé une api sur naruto personalisé
// import {customApiControler} from './controlleur/customController.js'
// app.get('/mon-api', function (req, res) {
//         //fetch recuperer l'api naruto
//          customApiControler(req,res)
// })
// //pour demarer le serveur
// app.listen(5000,function(){
//         console.log('Le serveur a demarré')

// })

//express
import express from 'express';

//app est la variable qui contient mon serveur web
const app = express();
const port = 5000;

app.use(express.json());
app.set('view engine', 'ejs');

// Chemin relatif vers les routeurs
import {taskRouteur} from './routeur/taskRouteur.js';
import {userRouteur} from './routeur/userRouteur.js';

// Utilisez les routeurs
app.use('/tasks', taskRouteur); // Chemin pour les tâches
app.use('/users', userRouteur); // Chemin pour les utilisateurs

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

// Fonction customApiController
app.get('/customController', async (req, res) => {
    
    
    res.send('Custom Controller Response');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});