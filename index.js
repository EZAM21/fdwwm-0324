console.log("Coucou les amis");

//Import du paquet mysql pour pouvoir l'utiliser ici
import mysql from "mysql"

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'restful_api'
});
 
connection.connect((err) => {
        if(err) throw err
        console.log("ok");
});



function getAllUsers() {
  connection.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;

      for (let i = 0; i < results.length; i++) {
          console.log('#ID : ', results[i].id);
          console.log('Nom : ', results[i].nom);
          console.log('Age : ', results[i].age);
      }

  });

  connection.end();
}

// getAllUsers();

function getUserId() {
  connection.query('SELECT iduser FROM users', (error, results) => {
    if(error) throw error;

    for ( let i = 0; i < results.length; i++){
      console.log("#ID : ", results[i].iduser);
    }
  })
};

// getUserId();

function getTaskFromNameUser() {
  connection.query('SELECT Nom FROM users', (error, results) => {
    if(error) throw error;

    for ( let i = 0; i < results.length; i++){
      console.log("Nom : ", results[i].Nom);
    }
  })
};

getTaskFromNameUser();