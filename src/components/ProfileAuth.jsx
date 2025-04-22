import { useState, useEffect} from 'react'

function ProfileAuth(){
const [userInfo, setUserInfo] = useState(null)
const [error, setError] = useState(null)

useEffect(()=> {
    const getUserInfo = async ()=> {
        try{
            const response = await fetch("https://fsa-recipe.up.railway.app/api/auth/me", 
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            )
            const result = await response.json()
        
                    if (response.ok){
                        setUserInfo(result)
                    }else{
                        setError(result.message || "Login Failed.")
                    }
                }catch(error){
                    console.log(error)
                }}
                
                if(token){
                    getUserInfo()
                }}, [token])

                if(error){
                    return <p>{error}</p>
                }
    return(
        <>
        <div>
            { userInfo ? 
            ( <>
                <h2>Welcome back {userInfo.username}!</h2>
              </>) : (<p>Loading</p>)
            }
        </div>
        </>
    )
}

export default ProfileAuth