'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
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

    useEffect(function(){
        const unsubscribe = onAuthStateChanged(auth, function(currentUser){
            console.log(user)
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }

    }, [])

    return (
        <UserContext.Provider value={{createUser, user}}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth(){
    return useContext(UserContext)
}