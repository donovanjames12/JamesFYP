import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native'; 
import {Card } from "react-native-elements"
import {auth, db} from "../firebase"

 /* HomePage used in navigation bar */
function HomePage({navigation}) {
    const [name, setName] = useState("")

    useEffect(() => {
        getUserData()
    }) 

    function getUserData() {
        db.collection("users").doc(auth.currentUser.uid).get()
        .then(userData => {
            setName(userData.data().name)
            console.log("hello")
        }).catch(error => {
            console.log(error.message)
        })
    }
    
   /* Inserting navigation bar button to view slider content*/
    return (
    <Card>
        <Card.Title>Welcome, {name} :)</Card.Title>   
    </Card>
    )
}

export default HomePage;