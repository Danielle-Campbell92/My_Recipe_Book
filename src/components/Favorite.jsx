function Favorite({favorite, setFavorite}){
   

    return(
    <>
    <div>
        <h2>Favorite Recipes!</h2>
        {favorite.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
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