import React, {useState, useEffect} from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Card, Image, Text, Button, Icon } from "react-native-elements"
import {db, auth} from "../firebase"

 /* HomePage used in navigation bar */
function HomePage({navigation}) {
    // const [name, setName] = useState("")

   /* useEffect(() => {
        getUserData()
    }) 

    function getUserData() {
        db.collection("users").doc(auth.currentUser.uid).get()
        .then(userData => {
            setName(userData.data().name)
           
        }).catch(error => {
            console.log(error.message)
        })
    }
    */
   
    /* SafeAreaView used due to screen components extending beyond the physical
     remits of the phone screen, code acquired here: https://reactnative.dev/docs/safeareaview */

     /* TouchableOpacity adds onPress ability to components,
      code for usage acquired here from NetNinja via youtube: https://www.youtube.com/watch?v=QhX25YGf8qg&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=8*/
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("View Our Rooms")}>
                <Card style={styles.card}>
                    <Card.Title>Book Room</Card.Title>
                    <Card.Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/room.jpg?alt=media&token=2bcd4025-7640-4929-93b3-e30d0b23c874"}}>          
                    </Card.Image>
                    <Text h5 style={styles.text}>Take a look at our rooms here!</Text>
                </Card>   
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => navigation.navigate("View Room Bookings")}>
                <Card style={styles.card}>
                    <Card.Title>Current Room Bookings.</Card.Title>
                    <Card.Image source={{uri: "data:image/png;base64,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"}}>          
                    </Card.Image>
                    <Text h5 style={styles.text}>See Room Bookings.</Text>
                </Card>   
            </TouchableOpacity> 
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    text: {      
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: "center"
    },
    card: {
        textAlign: "center"
    },
    image: {

    },
    container: {
        backgroundColor: '#fff',
        width: "100%",
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto"
    },
  });
export default HomePage;