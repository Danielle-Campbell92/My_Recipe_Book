function Favorite({favorite, setFavorite}){
   

    return(
        <>
        <div>
         <img src={recipe.strMealThumb} alt={recipe.strMeal} className="foodImg"/>
         <h2>{recipe.strMeal}</h2>
         <button onClick={()=> removeFavorite(recipe.idMeal)}>Remove from Favorite</button>
         </div>
        </>
    )
}
export default Favorite