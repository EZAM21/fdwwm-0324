//travailler avec des jetons d'authentification pour accéder aux informations de l'utilisateur dans la base de données.
import jsonwebtoken from 'jsonwebtoken'
import {User} from '../models/user.js'

export const auth = async (req, res, next) => { //auth fonction middleware est exportée afin qu'elle puisse être utilisée dans d'autres parties de l'application
    try {
        //on récupére le token dans le header de la requete
        const token = req.header('Authorization').replace('Bearer ', '')//La fonction commence par extraire le jeton d'authentification du header de la requête en utilisant req.header('Authorization')
        //on décode le token
        const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY)//utilise la clé secrète stockée dans la variable d'environnement process.env.JWT_KEY pour vérifier et décoder le jeton
        //on cherche l'utilisateur avec l'id et le token
        const user = await User.findOne({ //Méthode User.findOne pour effectuer la recherche. Si aucun utilisateur correspondant n'est trouvé, une erreur est générée.
            where: {
                id: decoded.id,
                token: token
            }
        })

        if (!user) {
            throw new Error()
        }
        //on ajoute la propriété user à la requete
        req.user = user
        //on ajoute la propriété token à la requete
        req.token = token
        //on passe à la suite
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authentificate.' })
    }
}