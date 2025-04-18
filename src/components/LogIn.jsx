import { useState } from "react"
import { useNavigate } from "react-router-dom"



function LogIn({setToken}){
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState(null)
const navigate = useNavigate()
 

async function handleSubmit(e){
    e.preventDefault()
    setError(null)

try{
    const response = await fetch ("https://fsa-recipe.up.railway.app/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
    )
          const result = await response.json()
            console.log("Login result:", result)

            if (result.token){
                console.log("Save to Storage")
                localStorage.setItem("token", result.token || username)
                setToken(result.token)
                navigate("/recipe")
            }else{
                setError(result.message || "Login Failed."
                )
            }
            
        }catch(error){
            console.log(error)
        }}
    

    return(
        <>
          <div className="details-container">
            <h2>Log In</h2>
                {error && <p className="error">{error}</p>}
             <form onSubmit={handleSubmit}>
                 <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                </label>
                 <br></br>
                 <br></br>
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </label>
                <br></br>
                <br></br>
                <button type="submit" className="button">Log In</button>
             </form>
         </div>
        </>
    )
}
export default LogIn