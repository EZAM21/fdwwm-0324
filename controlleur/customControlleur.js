// pour exporter 
export const customApiControlleur = async (req,res) => {
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
            const monJsonCustom = {...json,...newItem} // ... c'est un spread opertor pour copier coller
            
            res.send(monJsonCustom)
        } catch (error) {
                console.log(error)
        }
}