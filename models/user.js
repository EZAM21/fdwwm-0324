//Model des tâches avec sequelize
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

//Export user model
export const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            trim: true
        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
            validate: {
                isInt: {
                    args: true,
                    msg: "Age must be a number"
                },            
                min: {
                    args: 1,
                    msg: "Age must be greater than 0"
                },           
            }
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true,
            trim: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Email is invalid"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                len: {
                    args: [7, 50],
                    msg: "Password must be between 7 and 50 characters"
                },
                notContains: {
                    args: "password",
                    msg: "Password cannot contain the word password"
                }
            }
        },    
        }, {
            // timestamps: false,
            createdAt: false,
            updatedAt: false        
        }
    );

    //Middleware pour detecter les suppressions de tâches liées à l'utilisateur
// User.addHook('beforeDestroy', async (user) => { // .addhook ajoute un hook avant la destruction
//     console.log('beforeDestroy')
//     // await user.deleteTasks();
// });


//ajout de la méthode destroyAllTask
User.destroyAllTask = async (id) => {   
    const countTasksDeleted = await Task.destroy({
        where: {
            owner: id
        }
    })
    return countTasksDeleted;
}





// //méthode pour supprimer les tâches liés à l'utilisateur
// User.prototype.destroyAllTask = async function() {
//     console.log('deleteTasks')
//     // await Task.destroy({
//     //     where: {
//     //         owner: id
//     //     }
//     // })
// }