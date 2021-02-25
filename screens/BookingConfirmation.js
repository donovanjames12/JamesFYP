import React, { useState } from "react"
import { StyleSheet, View, Text, SafeAreaView } from "react-native"
import {Card, Button} from "react-native-elements"
import {db} from "../firebase"

 
 //https://reactnavigation.org/docs/route-prop/
 // name, dates and email passed as second parameter in addBooking function
 
function BookingConfirmation({navigation, route}) {
    const bookingType = route.params.type // booking type constant to allow differentiation between room and table
    const id = route.params.id // room and tabe id will be booking type differentiators

    // code on how to format dates acquired here: https://stackoverflow.com/questions/45547166/how-to-get-dd-mm-yyyy-format-date/45547206
    // function usedin below cards to display date in desired format
    function formatDate(date) {
        let dateObject = new Date(date)
        var formattedDate = dateObject.getDate() + "/" + dateObject.getMonth() + "/" + dateObject.getFullYear() 
        return formattedDate
    }

    // conditional inline rendering similar to registration component used here to idetify booking type
    return (
         <SafeAreaView style={styles.container}>
            {
                bookingType == "room" 
                ?
                <Card style={styles.card}>
                    <Card.Title>Booking Confirmation!</Card.Title>
                    <Card.Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxhWwaHoyeChsPdqWyY_D0taFIgHU71p6EQ&usqp=CAU"}}>          
                    </Card.Image>
                    <Text h5 style={styles.text}>Congrats {route.params.name}, your booking for these dates {formatDate(route.params.fromDate)} to {formatDate(route.params.toDate)} is confirmed. Your confirmation has been sent to {route.params.email}.</Text>
                    <Button title="Home" onPress={() => navigation.navigate("Main")} style={{marginTop: 20}}/>
                </Card>   
                :
                null
            }
            {
                bookingType == "table"
                ?
                <Card style={styles.card}>
                    <Card.Title>Booking Confirmation!</Card.Title>
                    <Card.Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIxhWwaHoyeChsPdqWyY_D0taFIgHU71p6EQ&usqp=CAU"}}>          
                    </Card.Image>
                    <Text h5 style={styles.text}>Congrats {route.params.name}, your booking for the date {formatDate(route.params.date)} is confirmed. Your confirmation has been sent to {route.params.contactNum}. You booked for {route.params.groupSize} seats at {route.params.timeslot}.</Text>
                    <Button title="Home" onPress={() => navigation.navigate("Main")} style={{marginTop: 20}}/>
                </Card>   
                :
                null
            }         
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