import React, {createContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";


export const AuthContext = createContext({});

function AuthContextProvider ({children}){
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status:"pending",
    });
    const history = useHistory()
useEffect(()=>{
    const checkToken= localStorage.getItem("token")
    if (checkToken) {
        const decoded = jwt_decode(checkToken);
        getUserData(decoded.sub, checkToken)
    }else{
        toggleIsAuth({...isAuth,
        isAuth:false,
        user: null,
        status:'done',
        })

    }
},[])

async function getUserData(id,token){
        try{
            const result = await axios.get(`http://localhost:3000/600/users/${id}`,{
                headers:{
                    "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
                }})
            console.log(result)

            toggleIsAuth({...isAuth,
                isAuth: true,
                status: "done",
                user:{
                    id: result.data.id,
                    email: result.data.email,
                    username: result.data.username,

                }
            })
        }catch (error){
            console.error(error)
             }
    }



    function signIn(jwt) {
        const decoded = jwt_decode(jwt);
        getUserData(decoded.sub, jwt)
        console.log('gebruiker is ingelogd')
        localStorage.setItem("token", jwt)
        history.push('/profile');
    }

    function signOut(jwt) {
        localStorage.getItem(jwt);
       toggleIsAuth(
            {...isAuth,
                isAuth:false,
                user:null})
        console.log('gebruiker is uitgelogd')
        history.push('/')
    }

    const data = {
        auth: isAuth.isAuth,
        isUser:isAuth.user,
        login: signIn,
        logout: signOut,

    }

    return (
        <AuthContext.Provider value={data}>
            {isAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
