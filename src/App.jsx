
import { Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Recipe from './components/Recipe'
import Register from './components/Register'
import './App.css'
import LogIn from './components/LogIn'
import RecipeDetails from './components/RecipeDetails'
import Favorite from './components/Favorite'

function App() {
  const [token, setToken] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [favorite, setFavorite] = useState([])
  const [username, setUsername] = useState([])
  const [moreDetails, setMoreDetails] = useState(null)  

useEffect(()=> {
  const storedUsername = localStorage.getItem("username")
  if (storedUsername) setUsername(storedUsername)})

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
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
    setFavorite(result)
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
      </Routes>
    </div>
    </div>
 
    </>
  )
}

export default App
