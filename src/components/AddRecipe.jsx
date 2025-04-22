import { useState } from "react"

function AddRecipe({recipes, setRecipes}){
    const [mealName, setMealName] = useState("")
    const [category, setCategory] = useState("")
    const [area, setArea] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
 
    const newRecipe = {
          idMeal: Date.now().toString(),
          strMeal: mealName,
          strCategory: category,
          strArea: area,
          strMealThumb: imageUrl,
        }
        try {
          console.log("Submitting recipe:", newRecipe)
          setRecipes([...recipes, newRecipe])
          setMessage("Recipe submitted!")
          setMealName("")
          setCategory("")
          setArea("")
          setImageUrl("")
        }catch (error) {
          console.error(error)
          setMessage("Failed to Submit")
        }
      }

    return(
        <>
        <div className="add-container">
            <h2>Add A New Recipe</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <label>
                  Meal Name: 
                  <input value={mealName} onChange={(e) => setMealName(e.target.value)} />
                </label>
                <br></br>
                <label>
                  Category: 
                  <input value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <br></br>
                <label>
                   Cuisine/Area: 
                   <input value={area} onChange={(e) => setArea(e.target.value)} />
                </label>
                <br></br>
                <label>
                   Image URL: 
                   <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>
                <br></br>
                <button type="submit" className="button">Submit Recipe</button>     
            </form>
        </div>
        </>
    )
}
export default AddRecipe