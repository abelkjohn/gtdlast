'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword,
    signOut, 
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../../api/firebase'

const UserContext = createContext()

export function AuthContextProvider({children}){
    const [ user, setUser ] = useState('')

    function createUser(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        return signOut(auth)
    }

    useEffect(function(){
        const unsubscribe = onAuthStateChanged(auth, function(currentUser){
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }

    }, [ user ])

    return (
        <UserContext.Provider value={{createUser, user, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth(){
    return useContext(UserContext)
}