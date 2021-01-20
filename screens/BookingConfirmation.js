import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import {Card, Button} from "react-native-elements"

 /* Room booking confirmation passed from add room booking displayed here */
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