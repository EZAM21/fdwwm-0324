// import {connection} from "../db.js"
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
export const getTaskById = async (req, res) => {

        try {
            //Récupére l'id de la tache dans l'url
            const id = req.params.id
    
            //Utilise la varibale db pour effectuer une requete SQL qui récupére la tache avec l'id
            db.query("SELECT * FROM task WHERE id = ?", [id], (error, result) => {
                if (error) throw error
                
                //si on a pas d'erreur on renvoi dans la réponse
                res.send(result)
                // console.log(result)
            });
        } catch (error) {
            res.send(error)
        }
        
    }


