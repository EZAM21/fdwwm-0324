import {connection} from '../db.js'

 export function getAllUsers() {
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

export function getUserId() {
        connection.query('SELECT iduser FROM users', (error, results) => {
          if(error) throw error;
      
          for ( let i = 0; i < results.length; i++){
            console.log("#ID : ", results[i].iduser);
          }
        })
      };


export function getTaskFromNameUser() {
        connection.query('SELECT Nom FROM users', (error, results) => {
          if(error) throw error;
      
          for ( let i = 0; i < results.length; i++){
            console.log("Nom : ", results[i].Nom);
          }
        })
      };
      
      getTaskFromNameUser();


      export const editAllTaskByNameUser = (name, description) => {

        //regex to avoid SQL injection
        const regex = /['"\/\\]/g;
        description = description.  replace(regex, '');    
        
        //get user id from name
        db.query("SELECT id FROM user WHERE nom = ?", [name], (error, result) => {
            if (error) {
                console.log(error)
            }    
    
            const id = result[0].id       
                    
            //with id update task
            db.query("UPDATE task SET description = ? WHERE owner = ?", [description, id], (error, result) => {
                if (error) {
                    console.log(error) 
                }    
                console.log(result.message)
            });
        });
    }
    
    export const deleteTaskByID = (id) => {
        db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
            if (error) {
                console.log(error)
            }    
            console.log("task with id "+id+" deleted")
        });  
    }
    
    export const addTaskFromNameUser = (name, description) => {
        
            //regex to avoid SQL injection
            const regex = /['"\/\\]/g;
            description = description.  replace(regex, '');    
            
            //get user id from name
            db.query("SELECT id FROM user WHERE nom = ?", [name], (error, result) => {
                if (error) {
                    console.log(error)
                }    
        
                const id = result[0].id       
                        
                //with id update task
                db.query("INSERT INTO task (description, owner) VALUES (?, ?)", [description, id], (error, result) => {
                    if (error) {
                        console.log(error) 
                    }    
                    console.log(result)
                });
            });
        }