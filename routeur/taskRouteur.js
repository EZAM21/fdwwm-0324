    import  express  from "express";
    import { auth } from "../middleware/auth.js";

    // creation du routeur express
    export const taskRouteur = express.Router()

    //importer les controlleurs
    import { getAlltask, getTaskById, postTaskById, deleteTaskById, editTaskById } from "../controlleur/taskController.js";

    /**
     * @api {get} /tasks GET all tasks
     * @apiDescription Get current task from the database
     * @apiName GetTasks
     * @apiGroup Task
     * @apiVersion 0.2.23
     * 
     * @apiSuccessExample Success-Response:
     *    HTTP/1.1 200 OK
    [
    {
        "id": 26,
        "description": "tache sympathique 1",
        "completed": false,
        "owner": 3,
        "createdAt": "2023-10-16",
        "updatedAt": "2023-10-16"
    },
    {
        "id": 27,
        "description": "tache sympathique 2",
        "completed": false,
        "owner": 3,
        "createdAt": "2023-10-16",
        "updatedAt": "2023-10-16"
    }
    ]
    * 
    */

    //route /users pour obtenir les listes des utilisateurs
    taskRouteur.get('/task/:id', auth, (req,res) => {
            getAlltask(req,res)
    })



    /**
     * @api {get} /tasks/:id GET task by id
     * @apiDescription Get current task from the database
     * @apiName GetTask
     * @apiGroup Task
     * @apiVersion 0.2.23
     * 
     * @apiParam {Number} id Task unique ID
     * 
     * @apiSuccessExample Success-Response:
        [
            {
                "id": 26,
                "description": "tache sympathique 1",
                "completed": false,
                "owner": 3,
                "createdAt": "2023-10-16",
                "updatedAt": "2023-10-16"
            }
        ]
    */
    //route du controller « getTaskById » qui prend en parametre l’id d’une tâche.
    taskRouteur.get('/tasks/:id', auth, (req, res) => {    
            getTaskById(req, res);
        })


    /**
     * @api {post} /tasks POST task
     * @apiDescription Get current task from the database
     * @apiName PostTask
     * @apiGroup Task
     * @apiVersion 0.2.23
     * 
     * @apiBody {String} description Task unique description
     * @apiBody {Boolean} completed Task unique completed
     * 
     * @apiParamExample {json} Request-Example:
        {
            "description": "tache sympathique 1",
            "completed": false
        }
    *
    * @apiSuccessExample Success-Response:
        {
            "id": 37,
            "description": "cool",
            "completed": false,
            "owner": "17",
            "updatedAt": "2023-10-23T11:45:41.948Z",
            "createdAt": "2023-10-23T11:45:41.948Z"
        }
    */
    //route du controller postTaskById 
    taskRouteur.post('/tasks/:id', auth, (req, res) => {
        postTaskById(req, res);
    })


    /**
     * @api {delete} /tasks/:id DELETE task by id
     * @apiDescription Get current task from the database
     * @apiName DeleteTask
     * @apiGroup Task
     * @apiVersion 0.2.23
     * 
     * @apiParam {Number} id Task unique ID
     */
    //route du controller deleteTaskById
    taskRouteur.delete('/tasks/:id',auth, (req, res) => {
        deleteTaskById(req, res);
    })



    /**
 * @api {put} /tasks/:id PUT task by id
 * @apiDescription Get current task from the database
 * @apiName PutTask
 * @apiGroup Task
 * @apiVersion 0.2.23
 * 
 * @apiParam {Number} id Task unique ID
 * 
 * @apiBody {String} description Task unique description
 * @apiBody {Boolean} completed Task unique completed
 * 
 * @apiParamExample {json} Request-Example:
    {
        "description": "tache sympathique 1",
        "completed": false
    }
 *
 * @apiSuccessExample Success-Response:
    {
        "id": 37,
        "description": "coool",
        "completed": false,
        "owner": "17",
        "updatedAt": "2023-10-23T11:45:41.948Z",
        "createdAt": "2023-10-23T11:45:41.948Z"
    }
 */
    //route du controller editTaskById
    taskRouteur.put('/tasks/:id', auth, (req, res) => {
        editTaskById(req, res);
    })