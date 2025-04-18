function Favorite({favorite, setFavorite}){

const handleRemoveFavorite = async (recipeId)=> {
    try{
        const token = localStorage.getItem("token")
        const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites/:id", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (response.ok) {
            setFavorite((prevFavorites) =>
              prevFavorites.filter((fav) => {
                const recipe = fav.recipe || fav;
                return recipe.idMeal !== recipeId;
              })
            );
          } else {
            console.error("Failed to remove favorite");
          }
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
      };
   

    return(
     <div>
        <h1>Favorite Recipes!</h1>
    <div className='card-container'>
        {favorite.length === 0 ? (
        <p>No Favorites Added</p>
      ) : (
        favorite.map((fav) => {
          const recipe = fav.recipe || fav;
          return (
            <div key={recipe.idMeal} className='card'>
              <h3>{recipe.strMeal}</h3>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="foodImage"/>
              <br></br>
              <button onClick={() => handleRemoveFavorite(recipe.idMeal)} className="button">
                Remove From Favorites
              </button>
            </div>
          );
        })
      )}
    </div>
    </div>
  
    )
}
export default Favorite