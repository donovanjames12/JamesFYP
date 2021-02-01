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
                    <Card.Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/room.jpg?alt=media&token=2bcd4025-7640-4929-93b3-e30d0b23c874"}}>          
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