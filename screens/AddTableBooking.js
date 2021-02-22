import React, { useState, useEffect } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { BottomSheet, ListItem, Input, Card, Button } from "react-native-elements" //https://reactnativeelements.com/docs/bottomsheet
import DateTimePicker from '@react-native-community/datetimepicker'
import {db} from "../firebase"


function AddTableBooking({navigation}) {
    const [name, setName] = useState("")
    const [groupSize, setGroupSize] = useState("")
    const [contactNum, setContactNum] = useState("")
    const [date, setDate] = useState(new Date())
    const [timeslot, setTimeslot] = useState("") 
    const [isVisible, setIsVisible] = useState(false);

    const list = [
        { 
            title: '17:00 - 18:00',
            onPress: () => setTimeslot("17:00 - 18:00")
        },
        { 
            title: '18:00 - 19:00',
            onPress: () => setTimeslot("18:00 - 19:00")
        },
        { 
            title: '19:00 - 20:00',
            onPress: () => setTimeslot("19:00 - 20:00")
        },
        { 
            title: '20:00 - 21:00',
            onPress: () => setTimeslot("19:00 - 20:00")
        },
        { 
            title: '21:00 - 22:00',
            onPress: () => setTimeslot("21:00 - 22:00")
        },
        {
          title: 'Cancel',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
      ];

    function handleName(name) {
        setName(name)
    }

    function handleGroupSize(groupSize) {
        setGroupSize(groupSize)
    }

    function handleContactNum(contactNum) {
        setContactNum(contactNum)
    }

    function handleTimeslot(timeslot) {
        setTimeslot(timeslot)
    }
    
    function handleDate(date) {
        setDate(date)
    }

    function addBooking() {
        db.collection("tableBookings").add({
            name: name,
            groupSize: groupSize,
            contactNum: contactNum,
            timeslot: timeslot,
            date: date
        }).then(doc => {
            setName("")
            setGroupSize("")
            setContactNum("")
            setDate(new Date())
            setTimeslot("")
            navigation.navigate("Booking Confirmation", {
                type: "table",
                name: name,
                groupSize: groupSize,
                contactNum: contactNum,
                timeslot: timeslot,
                date: date
            })
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <ScrollView>
            <Card>
                <Input 
                    label="Name:"
                    onChangeText={text => handleName(text)}   // when text is entered, handler requirements checked
                    value={name}       
                />

                <Input 
                    label="Group Size:"
                    onChangeText={text => handleGroupSize(text)}   // when text is entered, handler requirements checked
                    value={groupSize}       
                />

                <Input 
                    label="Contact Number:"
                    onChangeText={text => handleContactNum(text)}   // when text is entered, handler requirements checked
                    value={contactNum}       
                />
                    
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <Input 
                        value={timeslot}
                        label="Time Slot:"    
                        disabled={true}  
                    /> 
                </TouchableOpacity>

                <DateTimePicker
                    value={date}
                    mode={"date"}
                    display="default"
                    style={{width: "100%", marginBottom: 15, marginLeft: 8}}
                    onChange={(event, date) => handleDate(date)}
                />

                <BottomSheet
                    isVisible={isVisible}
                    containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
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