import React, { useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userType, setUserType] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                db.collection("users").doc(user.uid).get()
                    .then(result => {
                        setUserType(result.data().type)
                        setCurrentUser(user)  
                    }).catch(error => {
                        alert(error.message)
                    })
            } else {
               setUserType(null) 
               setCurrentUser(null)  
            } 
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userType
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

