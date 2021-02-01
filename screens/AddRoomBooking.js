import React, { useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import {Card, Button, Input, Icon} from "react-native-elements"
import {db} from "../firebase"

 /* AddRoomBooking destructured, route allows for transmission of data in react navigation,
 see this link for further information: https://reactnavigation.org/docs/route-prop/ 
 
 route parameters also used, passing inputted room data from room card to be viewed on booking page,
 see route parameters link: https://reactnavigation.org/docs/params/ 
 additional link also in BookingConfirmation.js */

function AddRoomBooking({route, navigation}) {
    const [room, setRoom] = useState(route.params.room)

    /* Setting Booking Variables as blank as they are data which will be inputted by user links in both addRoom
    and Login */ 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [cardNo, setCardNo] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    

    /* Adding inputted data to database from link:
     https://firebase.google.com/docs/firestore/manage-data/add-data on firebase documentation */

    function addBooking() {
        db.collection("roomBookings").doc().set({
            name: name,
            email: email,
            address: address, 
            contactNo: contactNo, 
            groupSize: groupSize,
            cardNo: cardNo,
            fromDate: fromDate,
            toDate: toDate,
            roomId: route.params.room.id
        }).then(() => {
            setName("")
            setEmail("")
            setAddress("")
            setContactNo("")
            setGroupSize("")
            setCardNo("")
            setFromDate("")
            setToDate("")

            /*carrying some data forward to booking confirmation*/
            navigation.navigate("Booking Confirmation", {
                name: name, 
                email: email,
                fromDate: fromDate,
                toDate: toDate
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (

        /*Scrollview allowing user to scroll through items, NetNinja code explanation 
        here: https://www.youtube.com/watch?v=W-pg1r6-T0g */

        /* room info displayed in card above room booking inputs accessible via route params,
        Input options for user to input booking details, button also used which calls
        addBooking function to adddata to firebase. */
        
        <ScrollView style={styles.view}>
            <Card style={styles.card}>
                <Card.Title>Room Information</Card.Title>
                <Card.Divider />
                <Text style={styles.text}>{room.roomType}</Text>
                <Text style={styles.text}>€{room.price}</Text>
                <Text style={styles.text}>{room.description}</Text>
            </Card>

            <Card style={styles.view}>
                <Input 
                    label="Name"
                    style={styles.textInput}   
                    onChangeText={text => setName(text)} 
                    value={name}       
                />

                <Input 
                    label="Email"
                    style={styles.textInput}    
                    onChangeText={text => setEmail(text)} 
                    value={email} 
                />

                <Input 
                    label="Address"
                    style={styles.textInput}    
                    onChangeText={text => setAddress(text)} 
                    value={address} 
                />

                <Input 
                    label="Contact No."
                    style={styles.textInput}     
                    onChangeText={text => setContactNo(text)} 
                    value={contactNo} 
                />

                <Input 
                    label="Group Size"
                    style={styles.textInput} 
                    onChangeText={text => setGroupSize(text)} 
                    value={groupSize}
                />

                <Input 
                    label="Credit Card Number (Deposit in event of 'No-Show')."
                    style={styles.textInput}  
                    onChangeText={text => setCardNo(text)} 
                    value={cardNo}   
                />

                <Input 
                    label="From (dd/mm/yy)"
                    style={styles.textInput}  
                    onChangeText={text => setFromDate(text)} 
                    value={fromDate}       
                />

                <Input 
                    label="To (dd/mm/yy)"
                    style={styles.textInput}   
                    onChangeText={text => setToDate(text)} 
                    value={toDate}  
                />

                    

                <Button title="Confirm Booking" onPress={addBooking}/>
            </Card>

            <Card>
                <Text H8>Book Now and pay upon arrival!</Text>
                <Text H8>Please Note: Failure to cancel or Not notifying us of a 'No-Show' Results in 65$ fee. </Text>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
     
    },
    text: {
        textAlign: "center"
    }
})

export default AddRoomBooking