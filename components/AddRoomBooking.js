import React, { useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import {Card, Button, Input, Icon} from "react-native-elements"
import {db} from "../firebase"

 /* Room inputs as props as they can vary and change, returning inputted data */
function AddRoomBooking({route, navigation}) {
    const [room, setRoom] = useState(route.params.room)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [cardNo, setCardNo] = useState("")
    const [fromDate, setFromDate] = useState("")
    const [toDate, setToDate] = useState("")
    
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