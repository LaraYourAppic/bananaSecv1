import React, {createContext, useState} from 'react';
import {useHistory} from "react-router-dom";


export const AuthContext = createContext({});

function AuthContextProvider ({children} ){
    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory()

    function signIn() {
        toggleIsAuth(true)
        console.log('gebruiker is ingelogd')
        history.push('/profile')
    }

    function signOut() {
        toggleIsAuth(false)
        console.log('gebruiker is uitgelogd')
        history.push('/')
    }

    const data = {
        login: signIn,
        logout: signOut,
        auth: isAuth,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
