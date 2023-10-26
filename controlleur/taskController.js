// importe le modèle de données(models) "Task" depuis un fichier appelé "task.js". 
import { Task } from '../models/task.js';
// import { escape } from 'escape-html';
import pkg from 'escape-html';
const { escape } = pkg;

//Cette fonction gère la lecture (READ) de toutes les tâches (tasks). Elle prend en charge la pagination, le filtrage et le tri des tâches en fonction des paramètres de requête.
export const getAlltask = async (req, res) => {    
           
    try {       
        //commence par définir des objets match, sort, et options pour stocker les critères de recherche, de tri et de pagination.
        const match = {} //filtrer
        const sort = {}
        
        //Objet options pour enregistrer toutes les options et l’envoyer à findAll request
        const options = {}
       
        // permet de sélectionner des tâches en fonction de leur état de complétion.
        if(req.query.completed) {
            match.completed = req.query.completed === 'true'//Si le paramètre de requête completed est présent, cette ligne examine sa valeur. Si la valeur est 'true', cela signifie qu'on souhaite filtrer les tâches complétées.

            //crée une clause where dans l'objet options
            options.where = match
        }                
      
        //gérer la partie "tri" des tâches (tasks) en fonction d'un paramètre de requête sortBy. 
        if(req.query.sortBy) {
            const parts = req.query.sortBy.split(':')         
            sort.createdAt = parts[1] === 'desc' ? 'DESC' : 'ASC'//détermine la direction du tri en fonction de la deuxième partie obtenue à partir du paramètre sortBy.     
            
            //creation d' order clause dans les options object
            options.order = sort
        }       
        
        //param limit /tasks?limit=2        
        if(req.query.limit) {         
            //utilisation de la méthode parsint pour convertir la chaîne en nombre  
            const limit = parseInt(req.query.limit)      
            
            //créer une clause limit dans l’objet options
            options.limit = limit
        }
               
        //param skip /tasks?skip=2        
        if(req.query.skip) {
            //utilisation de la méthode parsint pour convertir la chaîne en nombre
            const skip = parseInt(req.query.skip)     
            
            //create offset clause in options object
            options.offset = skip
        }        
                
        //méthode findAll du modèle "Task" en passant l'objet options pour rechercher les tâches dans la base de données.
        const tasks = await Task.findAll(
            options

            //options variables but it's like we have 
            /*
            where: {
                completed: false
            },
            order: {
                createdAt: 'DESC'
            },
            limit: 2,
             etc...
            */
        );

        // Si aucune tâche n'est trouvée, renvoie une réponse 404 ("no tasks found").
        if(!tasks) {
            res.status(404).send('no tasks found')
        }

        res.send(tasks);      
        
    } catch (error) {
        res.status(400).send(error)
    }   
}

//gère la lecture (READ) d'une tâche spécifique en fonction de son ID.
export const getTaskById = async (req, res) => {

    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        

        //obtenir Task By Id avec l’orm sequelize et trouver avec la clause where
        const task = await Task.findAll({
            where: {
                id: id
            }
        }); 

        if(!task) {
            res.status(404).send('no tasks found')
        }

        res.status(200).send(task);
        
    } catch (error) {
        res.send(error)
    }    
}
        /*
        //on utilise la varibale db pour effectuer une requete SQL qui récupére la tache avec l'id
        db.query("SELECT * FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.send(result)
            // console.log(result)
        });
        */

// INSERT / CREATION DU CRUD.
export const postTaskById = async (req, res) => {
    
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed
        
        //postTaskById avec l'orm
        const task = await Task.create({
            description: description,
            completed: completed,
            owner: id
        });

        if(!task) {
            res.status(404).send('cannot create task')
        }

        res.status(201).send(task);

        /*
        //insert task table from id
        db.query("INSERT INTO task (description, completed, owner) VALUES (?, ?, ?)", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });       
        */    
    } catch (error) {
        res.status(400).send(error)
    }

}

// suppression du CRUD
export const deleteTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id

        // supprimer Task By Id with orm
        const task = await Task.destroy({
            where: {
                id: id
            }
        });

        if(!task) {
            res.status(404).send('task not found')
        }

        res.status(200).send('task deleted'); 


        /*
        //update task table from id
        db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        */
    } catch (error) {
        res.send(error)
    }
    
}
// PUT / mis à jour du CRUD
export const editTaskById = async (req, res) => {
        
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed

        //edit task by id with orm
        const task = await Task.update({
            description: description,
            completed: completed
        }, {
            where: {
                id: id
            }
        });

        if(!task) {
            res.status(404).send('task not found')
        }

        res.status(200).send('task updated');

        /*
        //update task table from id
        db.query("UPDATE task SET description = ?, completed = ? WHERE id = ?", [description, completed, id], (error, result) => {
            if (error) throw error
            
            //si on a pas d'erreur on renvoi dans la réponse
            res.status(201).send(result)
            console.log(result)
        });
        */
    } catch (error) {
        res.send(error)
    }
    
}
// import {connection} from "../db.js"
// export function  getTaskFromNameUser () {
//         connection.query('SELECT nom FROM users', (error, results) => {
//                 if (error) throw error;

//                 for (let i = 0; i < results.length; i++) {
//                         console.log('Nom : ', results[i].nom);
//                 }
//         })
// };

// export function editOneTasksById (id,description) {
//         connection.query("UPDATE tasks SET description = ? WHERE id = ?",[description,id], (error, results) => {
//                 if (error) {
//                         console.log('error')
//                 }
//                 console.log(results)
//         })

// }

// export const getTaskById = async (req, res) => {

//         try {
//             //Récupére l'id de la tache dans l'url
//             const id = req.params.id
    
//             //Utilise la varibale db pour effectuer une requete SQL qui récupére la tache avec l'id
//             db.query("SELECT * FROM task WHERE id = ?", [id], (error, result) => {
//                 if (error) throw error
                
//                 //si on a pas d'erreur on renvoi dans la réponse
//                 res.send(result)
//                 // console.log(result)
// });
//         } catch (error) {
//             res.send(error)
//         }
        
// }

// //import model task
// import {Task} from '../models/task.js';


// //get Task data - SELECT / READ of CRUD
// export const getAlltask = async (req, res) => {     
   
//     try {
//         //select all record of table task
//         const tasks = await Task.findAll();

//         if(!tasks) {
//             res.status(404).send('no tasks found')
//         }

//         res.send(tasks);
        
//         } catch (error) {
//                 res.send(error)
//         }   
// }       

// //get Task data from id SELECT / READ of CRUD
// export const getTaskById = async (req, res) => {

//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id        
    
//         //get Task By Id  with the orm sequelize and find with where clause
//         const task = await Task.findAll({
//                 where: {
//                     id: id
//                 }
// }); 
    
//         if(!task) {
//                 res.status(404).send('no tasks found')
//             }
    
//             res.status(200).send(task);

//         } catch (error) {
//                 res.send(error)
//                 }    
// }
        
// // INSERT / CREATE of CRUD
// export const postTaskById = async (req, res) => {
            
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id
//         const description = req.body.description
//         const completed = req.body.completed

//         //postTaskById with the orm
//         const task = await Task.create({
//                 description: description,
//                 completed: completed,
//                 owner: id
// });

// export const postTaskById = (req, res) => {
//         const id = req.params.id('INSERT INTO tasks (description ,owner ) VALUES (?, ?)', [description, id], (error, result)=>{
//                 if (error){
//                         console.log('erreur')
//                 }
//                 res.send(result)
//         })
// }
    
//         if(!task) {
//                 res.status(404).send('cannot create task')
//             }
    
//             res.status(201).send(task);

//         } catch (error) {
//                 res.send(error)
//             }
        
// }
        
// // DELETE / DELETE of CRUD
// export const deleteTaskById = async (req, res) => {
                
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id
        
//         // delete Task By Id with orm
//         const task = await Task.destroy({
//                     where: {
//                         id: id
//                     }
// });
        
//         if(!task) {
//                     res.status(404).send('task not found')
//                 }
        
//                 res.status(200).send('task deleted');

//         } catch (error) {
//                 res.send(error)
//             }
            
// }

// // PUT / UPDATE of CRUD
// export const editTaskById = async (req, res) => {
                
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id
//         const description = req.body.description
//         const completed = req.body.completed
        
//         //edit task by id with orm
//         const task = await Task.update({
//                     description: description,
//                     completed: completed
//                 }, {
//                     where: {
//                         id: id
//                     }
// });
        
//         if(!task) {
//                     res.status(404).send('task not found')
//                 }
        
//                 res.status(200).send('task updated');

//         } catch (error) {
//                 res.send(error)
//                     }
            
// }


// //import model task
// import { Task } from '../models/task.js';


// //get Task data - SELECT / READ of CRUD
// export const getAlltask = async (req, res) => {    
           
//     try {       
//         //options de correspondance et de tri à enregistrer si elles existent dans l’objet req.query
//         const match = {}
//         const sort = {}
        
//         //options pour enregistrer toutes les options et l’envoyer à findAll request
//         const options = {}
       
//         //param terminé /tasks? completed=true
//         if(req.query.completed) {
//             match.completed = req.query.completed === 'true'

//             //creer  where clause dans les options object
//             options.where = match
//         }                
      
//         //param sort /tasks?sortBy=createdAt:desc 
//         if(req.query.sortBy) {
//             const parts = req.query.sortBy.split(':')         
//             sort.createdAt = parts[1] === 'desc' ? 'DESC' : 'ASC'    
            
//             //create order clause in options object
//             options.order = sort
//         }       
        
//         //param limit /tasks?limit=2        
//         if(req.query.limit) {         
//             //utilisation de  parsint method pour convertir string en number   
//             const limit = parseInt(req.query.limit)      
            
//             //create limit clause in options object
//             options.limit = limit
//         }
               
//         //param skip /tasks?skip=2        
//         if(req.query.skip) {
//             //utilisation de  parsint method pour convertir string en number 
//             const skip = parseInt(req.query.skip)     
            
//             //create offset clause in options object
//             options.offset = skip
//         }        
                
//         //sélectionner l’enregistrement de la tâche de table avec la bonne correspondance et trier
//         const tasks = await Task.findAll(
//             options
//         );

//         // const tasks = await Task.findAll();
//         if(!tasks) {
//             res.status(404).send('no tasks found')
//         }

//         res.send(tasks);      
        
//     } catch (error) {
//         res.status(400).send(error)
//     }   
// }

// //get Task data from id SELECT / READ of CRUD
// export const getTaskById = async (req, res) => {

//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id        

//         const task = await Task.findAll({
//             where: {
//                 id: id
//             }
//         }); 

//         if(!task) {
//             res.status(404).send('no tasks found')
//         }

//         res.status(200).send(task);        

//     } catch (error) {
//         res.send(error)
//     }    
// }

// // INSERT / CREATE of CRUD
// export const postTaskById = async (req, res) => {
    
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id
//         const description = req.body.description
//         const completed = req.body.completed
        
//         //postTaskById with the orm
//         const task = await Task.create({
//             description: description,
//             completed: completed,
//             owner: id
//         });

//         if(!task) {
//             res.status(404).send('cannot create task')
//         }

//         res.status(201).send(task);

//         /*
//         //insert task table from id
//         db.query("INSERT INTO task (description, completed, owner) VALUES (?, ?, ?)", [description, completed, id], (error, result) => {
//             if (error) throw error
            
//             //si on a pas d'erreur on renvoi dans la réponse
//             res.status(201).send(result)
//             console.log(result)
//         });       
//         */    
//     } catch (error) {
//         res.status(400).send(error)
//     }

// }

// // DELETE / DELETE of CRUD
// export const deleteTaskById = async (req, res) => {
        
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id

//         // delete Task By Id with orm
//         const task = await Task.destroy({
//             where: {
//                 id: id
//             }
//         });

//         if(!task) {
//             res.status(404).send('task not found')
//         }

//         res.status(200).send('task deleted'); 


//         /*
//         //update task table from id
//         db.query("DELETE FROM task WHERE id = ?", [id], (error, result) => {
//             if (error) throw error
            
//             //si on a pas d'erreur on renvoi dans la réponse
//             res.status(201).send(result)
//             console.log(result)
//         });
//         */
//     } catch (error) {
//         res.send(error)
//     }
    
// }
// // PUT / UPDATE of CRUD
// export const editTaskById = async (req, res) => {
        
//     try {
//         //on récupére l'id de la tache dans l'url
//         const id = req.params.id
//         const description = req.body.description
//         const completed = req.body.completed

//         //edit task by id with orm
//         const task = await Task.update({
//             description: description,
//             completed: completed
//         }, {
//             where: {
//                 id: id
//             }
//         });

//         if(!task) {
//             res.status(404).send('task not found')
//         }

//         res.status(200).send('task updated');

//         /*
//         //update task table from id
//         db.query("UPDATE task SET description = ?, completed = ? WHERE id = ?", [description, completed, id], (error, result) => {
//             if (error) throw error
            
//             //si on a pas d'erreur on renvoi dans la réponse
//             res.status(201).send(result)
//             console.log(result)
//         });
//         */
//     } catch (error) {
//         res.send(error)
//     }
    
// }




