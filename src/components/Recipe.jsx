import { useState, useEffect } from 'react'


function Recipe({ setMoreDetails, token }){
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

const handleAddFavorites = async (recipe) => {
    if (!token) {
        alert("You're not logged in!")
        return
      }
      try {
        const response = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mealId: recipe.idMeal,
            name: recipe.strMeal,
            imageUrl: recipe.strMealThumb
          }),
        })
  
        if (response.ok) {
          const result = await response.json()
          console.log("Favorite added:", result)
          setFavorite((prevFavorites) => [...prevFavorites, result])
        } else {
          const errorResult = await response.json()
          console.log("Error adding favorite:", errorResult.message)
        }
      } catch (error) {
        console.error("Error adding favorite:", error)
      }
    }

   return(
    <>
    <div>
        <h1>My Recipe Book!</h1>
        <div className='card-container'>
        {
        recipes.map((recipe) => 
        <div key={recipe.idMeal} className='card'>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="foodImg"/>
          <h2>{recipe.strMeal}</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Type of Cuisine: {recipe.strArea}</p>
          <button onClick={()=> {
             console.log("Clicked!", recipe)
                setMoreDetails(recipe)}} className='button'>Recipe Details</button>
          <button className='button' onClick={() => handleAddFavorites(recipe)}>Add to Favorites</button>
        </div>
        )}
        </div>
    </div>
    </>
   )}

export default Recipe