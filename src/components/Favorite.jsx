import React from "react"
import { useState } from "react"

function Favorite({favorite, setFavorite}){
const [filter, setFilter] = useState("")
    
const handleRemoveFavorite = async (favoriteId)=> {
    try{
        const token = localStorage.getItem("token")
        const response = await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${favoriteId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (response.ok) {
            setFavorite((prevFavorites) =>
              prevFavorites.filter((fav) => fav.id !== favoriteId)
            )
          } else {
            console.error("Failed to remove favorite");
          }
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
      };
   
    const filteredFavorites = favorite.filter((fav) => {
      const recipe = fav.recipe || fav
        return recipe.strMeal.toLowerCase().includes(filter.toLowerCase())
      })

    return(
     <div>
        <input type="text" placeholder="Search" value={filter} 
        onChange={(e) => setFilter(e.target.value)} className="filter"/>
        <h1>Favorite Recipes!</h1>
        <div className='card-container'>
             {filteredFavorites.length === 0 ? (
             <p>No Favorites Added</p>
              ) : (
              filteredFavorites.map((fav) => {
                 const recipe = fav.recipe || fav;
              return (
                <div key={recipe.idMeal} className='card'>
                 <h3>{recipe.strMeal}</h3>
                 <img src={recipe.strMealThumb} alt={recipe.strMeal} className="foodImage"/>
                 <br></br>
                 <button onClick={() => handleRemoveFavorite(fav.id)} className="button">
                     Remove From Favorites
                </button>
         </div>
          )
        })
      )}
    </div>
    </div>
    )
}
export default Favorite