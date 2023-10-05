export const customApiControlleur = async (req, res) => {
        try {
          const url = "https://api.jikan.moe/v4/anime?q=one%20piece&sfw";
          const data = await fetch(url);
          const json = await data.json();

          const newItem = {
                "MonEpisode":{
                        "title":"Episode 2",
                        "auteur":"Jojo"
                }
          }
          const monJsonCustom = {...json,...newItem} //... copier coller
          
          res.send(monJsonCustom)
        } catch (error) {
                
        }
}