import {connection} from "../db.js"
export function  getTaskFromNameUser () {
        connection.query('SELECT nom FROM users', (error, results) => {
                if (error) throw error;

                for (let i = 0; i < results.length; i++) {
                        console.log('Nom : ', results[i].nom);
                }
        })
};

export function editOneTasksById (id,description) {
        connection.query("UPDATE tasks SET description = ? WHERE id = ?",[description,id], (error, results) => {
                if (error) {
                        console.log('error')
                }
                console.log(results)
        })

}
export const getTaskById = (req, res) =>{
        const id = req.params.id
        connection.query('SELECT * FROM tasks WHERE id = ?',[id], (error, results) => {
                if (error){
                        console.log('error')
                }   
                // console.log(results)   
                res.status(200).send(results)  
        })
}


