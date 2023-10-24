// import {getTaskFromNameUser, editOneTasksById, getTaskById, } from "./controlleur/taskController.js"
// import {getAllUsers, getUserId} from "./controlleur/userController.js"



//  getUserId();

// getTaskFromNameUser();

// getAllUsers();

// editOneTasksById ("");

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
// import {customApiControler} from './controlleur/custom-api-controller.js'
// app.get('/mon-api', function (req, res) {
//         //fetch recuperer l'api naruto
//          customApiControler(req,res)
// })
// //pour demarer le serveur
// app.listen(5000,function(){
//         console.log('Le serveur a demarré')

// })

import {customApiController} from './controlleur/custom-api-controller.js'
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";
import bodyParser from 'body-parser';
import apicache from 'apicache'
import cors from 'cors'
// getAlltask()
//ici j'appelle la fonction getTaskFromIdUser avec en parametre 1
// getTaskFromIdUser(1) 
// getTaskFromNameUser('toto')
// editDescTaskByID(7, 'apprendre toujours et toujours')
// editAllTaskByNameUser('titi', 'apprendre un max !!')
// deleteTaskByID(7)
// addTaskFromNameUser('toto', 'apprendre un maxi !!')

// Debut de mon serveur express
import express from 'express' 

// Je crée une instance de mon serveur express
const app = express()

// Je défini le port sur lequel mon serveur va écouter
const port = 5000

//cors
app.use(cors())

//here we cached all routes
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

// set the request size limit to 1 MB
app.use(bodyParser.json({ limit: '1mb' }));

// Use Helmet to avoid security issues
app.use(helmet());

//rate limiter to avoid brute force attack
const rateLimiter = new RateLimiterMemory({
    points: 10, // maximum number of requests allowed
    duration: 1, // time frame in seconds
  });
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
    .then(() => {
        // request allowed, 
        // proceed with handling the request
        next();
    })
    .catch(() => {
        // request limit exceeded, 
        // respond with an appropriate error message
        res.status(429).send('Too Many Requests');
    });
};
app.use(rateLimiterMiddleware);

//indiquer a express qu'on peut insérer des donnée au format json
app.use(express.json())

//indiquer a express qu'on peut insérer des donnée au format form data
app.use(express.urlencoded({ extended: true }))

//pour obtenir le répertoire du chemin
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const publishDirectoryPath = path.join(__dirname, './public')

//set public directory
app.use(express.static(publishDirectoryPath))

//indiquer a express qu'on peut utiliser le moteur de template ejs
app.set('view engine', 'ejs') 

//indiquer a espress qu'on utilise un routeur
import {taskRouteur} from './routeur/taskRouteur.js'
import {userRouteur} from './routeur/userRouteur.js'
app.use(taskRouteur) 
app.use(userRouteur)



//route get sur l'url /
app.get('/', (req, res) => {
    // envoi du texte hello world
    // res.send('Hello World!')

    //envoi de json
    // res.json({message: 'Hello World!'})

    //envoi de html
    // res.send('<h1>Hello World!</h1>') 

    res.render('index', {title: 'Accueil'})

})

//route /api pour afficher une api distante que j'ai altéré
app.get('/custom-api', async (req, res) => {
    customApiController(req, res); 
})

//middleware pour la page 404
app.use((req, res, next) => {
    res.status(404).send(
        "<style>body{background: url(https://httpstatusdogs.com/img/404.jpg) no-repeat center center fixed #000000;}</style>")
})

//demarrage du serveur
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})