import React, { useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"

const AuthContext = React.createContext() // creating auth context

// 23-31 mins simple implementation of auth context https://www.youtube.com/watch?v=nQVCkqvU1uE
/* similar approach to the one which I took although instead of user tokens 
I manually set fields called type in firebase to admin and/or user.
this video does not use a database for searching the values, however, I do so with the below function
to search firebase for the fields I added. 

The video shows how conditional rendering is used to separate navigation screens based on auth,
I used the same approach in my navigation screens.*/
export function useAuth() {
  return useContext(AuthContext)
}

 // auth provider function exported to be used application wide
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userType, setUserType] = useState(null)

    // unsubscribe function structure here https://stackoverflow.com/questions/42762443/how-can-i-unsubscribe-to-onauthstatechanged
    // unsubscribe logic and onAuthStateChanged explained here: https://www.javaer101.com/en/article/18077800.html
   useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { // onAuthStateChanged takes a function as it's only argument. That function is the one that will be invoked whenever the auth state changes.
            // If user is null, nobody is signed in. 
            if(user) {
                db.collection("users").doc(user.uid).get() // firestore code to retrieve database data
                    .then(result => {
                        setUserType(result.data().type)  // database being searched for users, user type being set to the result of the firebase document type (I added this field manually)
                        setCurrentUser(user)  // current user is set to the result of the database field 
                    }).catch(error => {
                        alert(error.message)
                    })
            } else {
               setUserType(null) 
               setCurrentUser(null)  // otherwise, no eligible user found and result is null, null users displayed login and register screens only
            } 
        })

        return unsubscribe
    }, [])

    // values used to establish type of user (i.e. admin or customer)
    const value = {
        currentUser,
        userType
    }

    // above values passed into context provider to be accessible application wide
    return (
        <AuthContext.Provider value={value}> 
            {children} 
        </AuthContext.Provider>
    ) 
    // children being used on this component as the user type is not known in advance
    // children allows me to pass this components data to other components and establish the user type application wide

}

