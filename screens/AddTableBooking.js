import React, { useState, useEffect } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { BottomSheet, ListItem, Input, Card, Button } from "react-native-elements" //https://reactnativeelements.com/docs/bottomsheet
import DateTimePicker from '@react-native-community/datetimepicker'
import { MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
import { db } from "../firebase"
import DatePicker from "components/DatePicker"
import firebase from 'firebase'

function AddTableBooking({navigation}) {
    const [name, setName] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [contactNum, setContactNum] = useState("")
    const [date, setDate] = useState(new Date())
    const [timeslot, setTimeslot] = useState("") 
    const [isVisible, setIsVisible] = useState(false)

    // these constants are the same as AddRoom, used for conditional inputs
    const [isNameValid, setIsNameValid] = useState(false)
    const [isGroupValid, setIsGroupValid] = useState(false)
    const [isContactNumValid, setIsContactNumValid] = useState(false)
    
    // Creating icons to be used for input validation, icon code link here:  https://icons.expo.fyi/
    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />
    

    // bottom sheet code acquired here: https://reactnativeelements.com/docs/bottomsheet/
    // being used to display table booking time slots
    const list = [
        { 
            title: '17:00 - 18:00',
            onPress: () => {
                setTimeslot("17:00 - 18:00")
                setIsVisible(false)
            }
        },
        { 
            title: '18:00 - 19:00',
            onPress: () => {
                setTimeslot("18:00 - 19:00")
                setIsVisible(false)
            }
        },
        { 
            title: '19:00 - 20:00',
            onPress: () => {
                setTimeslot("19:00 - 20:00")
                setIsVisible(false)
            }
        },
        { 
            title: '20:00 - 21:00',
            onPress: () => {
                setTimeslot("19:00 - 20:00")
                setIsVisible(false)
            } 
        },
        { 
            title: '21:00 - 22:00',
            onPress: () => {
                setTimeslot("21:00 - 22:00")
                setIsVisible(false)
            }
        },
        {
          title: 'Minimize',
          containerStyle: { backgroundColor: 'blue' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
      ];

      function handleName(name) {
        setName(name)

        if(name.length < 1) {
            setIsNameValid(false)
        } else {
            setIsNameValid(true)
        }
    }

    function handleGroup(groupSize) {
        setGroupSize(groupSize)

        if(groupSize > 99) {
            setIsGroupValid(false)
        } else {
            setIsGroupValid(true)
        }
    }

    function handleContactNum(contactNum) {
        setContactNum(contactNum)

        if(contactNum.length < 9) {
            setIsContactNumValid(false)
        } else {
            setIsContactNumValid(true)
        }
    }

    function handleTimeslot(timeslot) {
        setTimeslot(timeslot)
    }
    
    function handleDate(date) {
        setDate(date)
    }

    /* Adding inputted data to database from link:
     https://firebase.google.com/docs/firestore/manage-data/add-data on firebase documentation */
     // parameters passed in navigate function to be called in booking confirmation
    async function addBooking() {
        const fromDate = new Date(date)
        fromDate.setHours(0,0,0,0)
        const toDate = new Date(date)
        toDate.setHours(23,59,59)
        
        let docs = await db.collection("tableBookings").where("date", ">", fromDate).where("date", "<", toDate).where("timeslot", "==", timeslot).get().catch(error => console.log(error.message))

        let availableSeats = 100
        docs.forEach(doc => {
            availableSeats -= doc.data().groupSize
        })

        if(availableSeats < groupSize) {
            alert(`There are only ${availableSeats} seats remaining for this timeslot.`)
            return 
        } 
            
        try {
            await db.collection("tableBookings").add({
                name: name,
                groupSize: parseInt(groupSize),
                contactNum: contactNum,
                timeslot: timeslot,
                date: date
            })
    
            setName("")
            setGroupSize("")
            setContactNum("")
            setDate(new Date())
            setTimeslot("")
    
            navigation.navigate("Booking Confirmation", {
                type: "table", // type here is used in booking confirmation, differentiate between room
                name: name,
                groupSize: groupSize,
                contactNum: contactNum,
                timeslot: timeslot,
                date: date
            }) 
        } catch(error) {
            alert(error.message)
        }   
    }

    return (
        <ScrollView>
            <Card>
                <Input 
                    label="Name:"
                    onChangeText={text => handleName(text)}   // when text is entered, handler requirements checked
                    rightIcon={isNameValid ? tickIcon : crossIcon} //conditional rendering using above constants and handlers 
                    value={name}       
                />

                <Input 
                    label="Group Size:"
                    onChangeText={text => handleGroup(text)}   // when text is entered, handler requirements checked
                    rightIcon={isGroupValid ? tickIcon : crossIcon}
                    value={groupSize}  
                    keyboardType="decimal-pad"     
                />

                <Input 
                    label="Contact Number:"
                    onChangeText={text => handleContactNum(text)}   // when text is entered, handler requirements checked
                    rightIcon={isContactNumValid ? tickIcon : crossIcon}
                    value={contactNum} 
                    keyboardType="decimal-pad"      
                />
                    
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Input 
                        value={timeslot}
                        label="Time Slot:"    
                        disabled={true}  
                    /> 
                </TouchableOpacity>

                
                <DatePicker date={date} setDate={setDate} style={{ marginLeft: 125, marginBottom: 20}}/>

                <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                    //all code from ract native elements bottom sheet link above in addition to below mapping
                    // mapping similar to flatlist, another way of presenting data on the UI
                >   
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}> 
                            <ListItem.Content>
                                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>

                <Button title={"Book"} onPress={addBooking} />
            </Card>  
        </ScrollView>
    )
}

export default AddTableBooking