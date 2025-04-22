
import { Routes, Route, Link } from 'react-router-dom'
import {  useEffect, useState } from 'react'
import Recipe from './components/Recipe'
import Register from './components/Register'
import './App.css'
import LogIn from './components/LogIn'
import RecipeDetails from './components/RecipeDetails'
import Favorite from './components/Favorite'
import AddRecipe from './components/AddRecipe'

function App() {
  const [token, setToken] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [favorite, setFavorite] = useState([])
  const [moreDetails, setMoreDetails] = useState(null)  


useEffect(() => {
    if (favorite) {
      localStorage.setItem("favorite", JSON.stringify(favorite))
  }}, [favorite])

useEffect(() => {
  const storedFavorite = localStorage.getItem("favorite");
  if (storedFavorite) {
    setFavorite(JSON.parse(storedFavorite));  
  }
}, [])

  useEffect(() => {
    const storedToken = localStorage.getItem("token", token)
    if (storedToken) {
      setToken(storedToken);
    }
  }, [])

    useEffect(()=> {
     const getRecipe = async () => {
       try{
         const res = await fetch ("https://fsa-recipe.up.railway.app/api/recipes")
         const result = await res.json()
         setRecipes([...recipes, newRecipe])
       }catch(error){
         console.log(error)
       }
     }
     getRecipe()
     console.log("First useEffect")
   }, [])


   useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://fsa-recipe.up.railway.app/api/recipes")
        const result = await response.json()
        console.log("Fetched recipes:", result)
        setRecipes(result)
      } catch (error) {
        console.error("Error fetching recipes:", error)
      }
    }
  
    fetchRecipes()
  }, [])

useEffect(()=>{
  const getFav = async ()=> {
    if(!token) return

  try{
    const response = await fetch ("https://fsa-recipe.up.railway.app/api/favorites", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const result = await response.json()
    console.log("Favorite", result)
    setFavorite(result.data)
  }catch(error){
    console.log("error")
  }
}
getFav()}, [token])


  return (
    <>
    <div>
      <nav className='navBar'>
        <div>
          <Link to="/register" className='navLink'>Register</Link>
          <Link to="/login" className='navLink'>Log In</Link>
          <Link to="/recipe" className="navLink">Recipes</Link>
          <Link to="/favorite" className="navLink">Favorite Recipes</Link>
          <Link to="/addRecipe" className='navLink'>Add Recipe</Link>
        </div>
      </nav> 
    <div className="container">
      <br></br>
      <Routes>
          <Route path='/register' element={<Register setToken={setToken}/>}/>
          <Route path='/login' element={<LogIn setToken={setToken}/>}/>
          <Route path='/recipe' element={
              <div>
              {moreDetails ? <RecipeDetails moreDetails={moreDetails} setMoreDetails={setMoreDetails} />
               : <Recipe recipes={recipes} setRecipes={setRecipes} setMoreDetails={setMoreDetails} favorite={favorite} setFavorite={setFavorite} token={token}/>}
               </div>
              }/>
          <Route path='/favorite' element={
            <div>
             {favorite ? <Favorite favorite={favorite} setFavorite={setFavorite}/>
              : <p>No Favorites Saved Yet! Add Favorites!</p>}
              </div>
            }/>
          <Route path='/addRecipe' element={<AddRecipe recipes={recipes} setRecipes={setRecipes} />}/>
      </Routes>
    </div>
    </div>
 
    </>
  )
}

export default App
