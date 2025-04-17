import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Register({setToken}){
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState(null)
    const[success, setSuccess] = useState(false)
    const navigate = useNavigate()

    function validateForm(){
        if(username.length < 6){
            setError("Username must be at least 6 characters long")
              return false
        }
        if(password.length < 6){
            setError("Password must be at least 6 characters long")
              return false
        }
        setError(null)
        return true
    }

    async function handleSubmit(event){
        event.preventDefault()

        if(!validateForm())
            return

        try{
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        )
        const result = await response.json()
        console.log(result)
        
        if(result.token){
            setToken(result.token)
            localStorage.setItem("token", result.token)
            navigate("/recipe")
        }else{
            setError(result.message || "Try again")
        }
    }catch(error){
        console.log(error)
    }
    }

    return(
        <>
        <div className='details-container'>
        <h2>Sign Up for More Recipes!</h2>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>Registration Successful!🎉</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: <input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br></br>
            <br></br>
            <label>
                Password: <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
            </label>
            <br></br>
            <br></br>
            <button type='submit' className='button'>Submit!</button>
        </form>
        </div>
        </>
    )
}
export default Register