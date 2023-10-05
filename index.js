import {getAllUsers, getUserId, getTaskFromNameUser } from './controllers/user.js'
getAllUsers();

import express from "express";
const app = express();
app.get('/', function(req, res) {
        res.send('<p>Mon api</p>')
})

app.get('/json', function() {
        res.json({
                'Nom':'Jacques',
                'Age':'35'
        })
})

//Démarrer le serveur
app.listen(3000, function(){
        console.log("Mon serveur a démarrer");
});

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end('Voilà la réponse du serveur !');
// });

// server.listen(process.env.PORT || 3000);






















// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.listen(port, () => {
//   console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
// });
// const express = require('express');
// const app = express();
// const port = 3000; // Vous pouvez spécifier le port de votre choix

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.listen(port, () => {
//   console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
// });
