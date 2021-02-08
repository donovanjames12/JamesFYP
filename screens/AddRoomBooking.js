import React, { useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import {Card, Button, Input, Icon} from "react-native-elements"
import { MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
import {db} from "../firebase"

 /* AddRoomBooking destructured, route allows for transmission of data in react navigation,
 see this link for further information: https://reactnavigation.org/docs/route-prop/ 
 
 route parameters also used, passing inputted room data from room card to be viewed on booking page,
 see route parameters link: https://reactnavigation.org/docs/params/ 
 additional link also in BookingConfirmation.js */

function AddRoomBooking({route, navigation}) {
    const [room, setRoom] = useState(route.params.room)

    const [isNameValid, setIsNameValid] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isAddressValid, setIsAddressValid] = useState(false)
    const [isContactNoValid, setIsContactNoValid] = useState(false)
    const [isGroupValid, setIsGroupValid] = useState(false)
    const [isCardNoValid, setIsCardNoValid] = useState(false)
    const [isFromDateValid, setIsFromDateValid] = useState(false)
    const [isToDateValid, setIsToDateValid] = useState(false)

     /* The below constant is email regex, regex can be used as test validation for inputs such
    as emails, currencies etc. different variations are used and created by people online,
    anyone can make them if they know how, I copied this from a stack overflow forum.
    I use the regex in the below email handler to test if the user is registering with
    a valid email or not. */
    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />
    
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

        /* conditional rendering is used in the inputs, the constants created above are green and red ticks which will be displayed in the event of
     correct or incorrect information being inputted to notify the user, the condiions of the handlers
     are created below, then in the inputs at the bottom of this form, shorthand boolean (conditional rendering)
     is used to display either the red or green icon based on the conditions created, code on how 
     I learnt to do this can be seen in the official react navigation here: https://reactjs.org/docs/conditional-rendering.html */

     function handleEmail(email) {
        setEmail(email)

        if(emailFormat.test(email)) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    function handleAddress(address) {
        setAddress(address)

        if(address.length < 3) {
            setIsAddressValid(false)
        } else {
            setIsAddressValid(true)
        }
    }

    function handleName(name) {
        setName(name)

        if(name.length < 1) {
            setIsNameValid(false)
        } else {
            setIsNameValid(true)
        }
    }

    
    function handleContactNo(contactNo) {
        setContactNo(contactNo)

        if(contactNo.length < 9) {
            setIsContactNoValid(false)
        } else {
            setIsContactNoValid(true)
        }
    }

    function handleGroup(groupSize) {
        setGroupSize(groupSize)

        if(groupSize.length >= 3) {
            setIsGroupValid(false)
        } else {
            setIsGroupValid(true)
        }
    }

    function handleCardNo(cardNo) {
        setCardNo(cardNo)

        if(cardNo.length < 12) {
            setIsCardNoValid(false)
        } else {
            setIsCardNoValid(true)
        }
    }

    function handleToDate(toDate) {
        setToDate(toDate)

        if(toDate.length < 8) {
            setIsToDateValid(false)
        } else {
            setIsToDateValid(true)
        }
    }

    function handleFromDate(fromDate) {
        setFromDate(fromDate)

        if(fromDate.length < 8) {
            setIsFromDateValid(false)
        } else {
            setIsFromDateValid(true)
        }
    }
    

    /* Adding inputted data to database from link:
     https://firebase.google.com/docs/firestore/manage-data/add-data on firebase documentation */

      // Room cannot be added unless the conditions of all input handlers are met
    function addBooking() {
        if(isNameValid && isEmailValid && isAddressValid && isContactNoValid && isGroupValid
             && isCardNoValid && isFromDateValid && toDate ) 
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

            /*carrying some data forward to booking confirmation, this is via navigation routes*/
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
        
         // see shorthand conditional rendering as described above in rightIcon below

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
                    rightIcon={isNameValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleName(text)}  
                    value={name}       
                />

                <Input 
                    label="Email"
                    style={styles.textInput}  
                    rightIcon={isEmailValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleEmail(text)}  
                    value={email} 
                />

                <Input 
                    label="Address"
                    style={styles.textInput}    
                    rightIcon={isAddressValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleAddress(text)}  
                    value={address} 
                />

                <Input 
                    label="Contact No. (Mobile)"
                    style={styles.textInput}     
                    rightIcon={isContactNoValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleContactNo(text)}  
                    value={contactNo} 
                    keyboardType="decimal-pad"
                />

                <Input 
                    label="No. Guests (Max 2 Per Room!"
                    style={styles.textInput} 
                    rightIcon={isGroupValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleGroup(text)}  
                    value={groupSize}
                    keyboardType="decimal-pad"
                />

                <Input 
                    label="Credit Card Number (Deposit in event of 'No-Show')."
                    style={styles.textInput}  
                    rightIcon={isCardNoValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleCardNo(text)}  
                    value={cardNo}  
                    keyboardType="decimal-pad" 
                />

                <Input 
                    label="From (dd/mm/yy)"
                    style={styles.textInput}  
                    rightIcon={isFromDateValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleFromDate(text)}  
                    value={fromDate}       
                />

                <Input 
                    label="To (dd/mm/yy)"
                    style={styles.textInput}   
                    rightIcon={isToDateValid ? tickIcon : crossIcon}  
                    onChangeText={text => handleToDate(text)}  
                    value={toDate}  
                />

                    

                <Button title="Confirm Booking" onPress={addBooking}/>
            </Card>

            <Card>
            <Card.Title>**Room Booking Useful Info**</Card.Title>
                <Card.Divider />
                <Text  style={styles.text}>Book Now and pay upon arrival!</Text>
                <Text  style={styles.text}>Please Note: Failure to cancel or Not notifying us of a 'No-Show' Results in 65$ fee. </Text>
                <Text  style={styles.text}>Max 2 persons per room.</Text>
                <Text  style={styles.text}>To CANCEL, call me @ 087-23345435</Text>
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