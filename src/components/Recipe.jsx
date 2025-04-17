import { useState, useEffect } from 'react'

function Recipe({ setMoreDetails }){
     const [recipes, setRecipes] = useState([])
     const [favorite, setFavorite] = useState([])

   
   useEffect(()=> {
     const getRecipe = async () => {
       try{
         const res = await fetch ("https://fsa-recipe.up.railway.app/api/recipes")
         const result = await res.json()
         setRecipes(result)
       }catch(error){
         console.log(error)
       }
     }
     getRecipe()
     console.log("First useEffect")
   }, [])

   return(
    <>
    <div>
        <h1>My Recipe Book!</h1>
        {
        recipes.map((recipe) => 
        <div key={recipe.idMeal}>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="foodImg"/>
          <h2>{recipe.strMeal}</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Type of Cuisine: {recipe.strArea}</p>
          <button onClick={()=> {
            console.log("Clicked!", recipe)
            setMoreDetails(recipe)}} className='button'>Recipe Details</button>
          <button className='button' onClick={()=>{
            console.log("Clicked", recipe)
            setFavorite([...favorite, recipe])}}>Add to Favorites</button>
            </div>
        )}
        
    </div>
    </>
   )
}
export default Recipe