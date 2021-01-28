import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import {Card, Button} from "react-native-elements"

 /* Room booking confirmation passed from add room booking displayed here see 
 route.params code here: https://medium.com/swlh/passing-params-with-react-navigation-dd86c5de024c */

 /* navigating around and destructuring navigatioon props i.e. ({navigation})
 explained here https://www.youtube.com/watch?v=PMX6GP1TXGo using onPress Handler */
function BookingConfirmation({navigation, route}) {
    return (
        <>
            <Card style={styles.view}>
                <Text>Congrats {route.params.name}, your booking for these dates {route.params.fromDate} to {route.params.toDate} is confirmed. Your confirmation has been sent to {route.params.email}.</Text>
                <Button title="Home" onPress={() => navigation.navigate("Main")} style={{marginTop: 20}}/>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
       
    }
})

export default BookingConfirmation