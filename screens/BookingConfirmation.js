import React, { useState } from "react"
import { StyleSheet, View, Text, SafeAreaView } from "react-native"
import {Card, Button} from "react-native-elements"

 /* Room booking confirmation passed from add room booking displayed here see 
 route.params code here: https://medium.com/swlh/passing-params-with-react-navigation-dd86c5de024c */
 //https://reactnavigation.org/docs/route-prop/
 /* navigating around and destructuring navigatioon props i.e. ({navigation})
 explained here https://www.youtube.com/watch?v=PMX6GP1TXGo using onPress Handler */
function BookingConfirmation({navigation, route}) {
    return (
         <SafeAreaView style={styles.container}>
           
            <Card style={styles.card}>
                    <Card.Title>Booking Confirmation!</Card.Title>
                    <Card.Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxhWwaHoyeChsPdqWyY_D0taFIgHU71p6EQ&usqp=CAU"}}>          
                    </Card.Image>
                    <Text h5 style={styles.text}>Congrats {route.params.name}, your booking for these dates {route.params.fromDate} to {route.params.toDate} is confirmed. Your confirmation has been sent to {route.params.email}.</Text>
                    <Button title="Home" onPress={() => navigation.navigate("Main")} style={{marginTop: 20}}/>
                </Card>   

                </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    view: {
       
    },

    card: {
        textAlign: "center"
    },

    container: {
        backgroundColor: '#fff',
        width: "100%",
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto"
    },

    text: {      
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: "center"
    }

})

export default BookingConfirmation