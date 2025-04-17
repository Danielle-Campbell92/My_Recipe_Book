function RecipeDetails({moreDetails, setMoreDetails}){
console.log("Recipe Details received:", moreDetails)

    return(
        <>
        <div className="details-container">
            {
                moreDetails ? (
                    <>
                    <img src={moreDetails.strMealThumb} alt={moreDetails.strMeal} className="foodImg"/>
                    <h2>{moreDetails.strMeal}</h2>
                    <p>Category:{moreDetails.strCategory}</p>
                    <p>Type of Cuisine:{moreDetails.strArea}</p>
                    <p>Ingredients: {moreDetails.ingredients}</p>
                    <p>Instructions: {moreDetails.strInstructions}</p>
                    <p>Link to Video: {" "} <a href={moreDetails.strYoutube} target="_blank" rel="noopener noreferrer">Watch!</a></p>
                    <button onClick={()=> setMoreDetails(null)} className="button">Go Back</button>
                    </>
                ) : (
                    <p>No Details Available...Sorry!</p>
                )
            }
        </div>
        </>
    )
}
export default RecipeDetails