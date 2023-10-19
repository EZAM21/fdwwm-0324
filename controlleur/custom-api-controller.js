// pour exporter 
export const customApiController = async (req,res) => {
        try {
            const url ='https://api.jikan.moe/v4/anime?q=naruto&sfw'
            const data = await fetch (url)
            const json = await data.json()
                // objet json
            const newItem = {
                'monAnime':{
                        'title':'One Piece Movie 01',
                        'auteur':'Jojo'

                }
            }
            //Création d'un nouvel objet JSON avec les données de data et de newitem
            const newData = {...json, ...newItem}

        //j'envoi le nouvel objet
        res.send(newData)
        
        } catch (error) {
            res.send(error)
        }   
 

}