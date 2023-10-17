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

//import model task
import {Task} from '../models/task.js';


//get Task data - SELECT / READ of CRUD
export const getAlltask = async (req, res) => {     
   
    try {
        //select all record of table task
        const tasks = await Task.findAll();

        if(!tasks) {
            res.status(404).send('no tasks found')
        }

        res.send(tasks);
        
        } catch (error) {
                res.send(error)
        }   
}       

//get Task data from id SELECT / READ of CRUD
export const getTaskById = async (req, res) => {

    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id        
    
        //get Task By Id  with the orm sequelize and find with where clause
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
        
// INSERT / CREATE of CRUD
export const postTaskById = async (req, res) => {
            
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed

        //postTaskById with the orm
        const task = await Task.create({
                description: description,
                completed: completed,
                owner: id
});
    
        if(!task) {
                res.status(404).send('cannot create task')
            }
    
            res.status(201).send(task);

        } catch (error) {
                res.send(error)
            }
        
}
        
// DELETE / DELETE of CRUD
export const deleteTaskById = async (req, res) => {
                
    try {
        //on récupére l'id de la tache dans l'url
        const id = req.params.id
        
        // delete Task By Id with orm
        const task = await Task.destroy({
                    where: {
                        id: id
                    }
});
        
        if(!task) {
                    res.status(404).send('task not found')
                }
        
                res.status(200).send('task deleted');

        } catch (error) {
                res.send(error)
            }
            
}

// PUT / UPDATE of CRUD
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

        } catch (error) {
                res.send(error)
                    }
            
}



