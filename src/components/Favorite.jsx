function Favorite({favorite, setFavorite}){
   

    return(
    <>
    <div className="details-container">
        <h2>Favorite Recipes!</h2>
        {favorite.length === 0 ? (
        <p>No Favorites Added</p>
         ) : (
          favorite.map(recipe => (
            <div key={recipe.idMeal}>
            <h3>{recipe.strMeal}</h3>
            <button onClick={() => setFavorite(null)}>
              Remove From Favorites
            </button>
          </div>
             ))
        )}
      </div>
    </>
    )}
export default Favorite