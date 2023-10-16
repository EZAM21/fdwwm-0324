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

// import {getAlltask, getTaskFromIdUser, getTaskFromNameUser, editDescTaskByID, editAllTaskByNameUser, deleteTaskByID, addTaskFromNameUser} from './controllers/task.js'
// import {customApiController} from './controllers/custom-api.js'
// getAlltask()
//ici j'appelle la fonction getTaskFromIdUser avec en parametre 1
// getTaskFromIdUser(1) 
// getTaskFromNameUser('toto')
// editDescTaskByID(7, 'apprendre toujours et toujours')
// editAllTaskByNameUser('titi', 'apprendre un max !!')
// deleteTaskByID(7)
// addTaskFromNameUser('toto', 'apprendre un maxi !!')

// // Debut de mon serveur express
// import express from 'express' 

// // Création  d'une instance de mon serveur express
// const app = express()

// // Je défini le port sur lequel mon serveur va écouter
// const port = 5000

// //indiquer a express qu'on peut insérer des données au format json
// app.use(express.json())

// //indiquer a express qu'on peut utiliser le moteur de template ejs
// app.set('view engine', 'ejs') 

// //indiquer a espress qu'on utilise un routeur
// import {taskRouteur} from '/routeur/taskRouteur.js'
// import {userRouteur} from '/routeur/userRouteur.js'
// app.use(taskRouteur) 
// app.use(userRouteur)

// //route get sur l'url /
// app.get('/', (req, res) => {
//     // envoi du texte hello world
//     // res.send('Hello World!')

//     //envoi de json
//     // res.json({message: 'Hello World!'})

//     //envoi de html
//     // res.send('<h1>Hello World!</h1>') 

//     res.render('index', {title: 'Accueil'})

// })

// //route de l'api pour afficher une api distante altérée
// app.get('/customController', async (req, res) => {
//     customApiController(req, res); 
// })

// //demarrage du serveur
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })


import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());
app.set('view engine', 'ejs');

// Indiquez le chemin relatif vers vos routeurs
import {taskRouteur} from './routeur/taskRouteur.js';
import {userRouteur} from './routeur/userRouteur.js';

// Utilisez les routeurs
app.use('/tasks', taskRouteur); // Exemple de chemin pour les tâches
app.use('/users', userRouteur); // Exemple de chemin pour les utilisateurs

app.get('/', (req, res) => {
    res.render('index', { title: 'Accueil' });
});

app.get('/customController', async (req, res) => {
    // customApiController(req, res); // Assurez-vous que cette fonction existe ou incluez-la correctement
    res.send('Custom Controller Response');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
      
     
      