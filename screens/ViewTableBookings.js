import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import {Card, Button} from "react-native-elements"
import { db } from "../firebase.js" 
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'

 /* This form is the exact same layout as RoomList */
function ViewTableBookings({navigation}) {
    const [tableBookingList, setTableBookingList] = useState([])
    const [date, setDate] = useState(new Date())
    const [startTimestamp, setStartTimestamp] = useState(0)
    const [endTimestamp, setEndTimestamp] = useState(99999999999999999999999999999999999999999999)

     const actions = [
        {
          text: "Refresh",
          icon: <AntDesign name="retweet" size={24} color="white" />,
          name: "floatingRefresh",
          position: 1
        },
      ]; 

    useEffect(() => {
        let testDate = date

        testDate.setHours(0,0,0,0)
        setStartTimestamp(testDate.getTime())   

        testDate.setHours(23,59,59,0)
        setEndTimestamp(testDate.getTime()) 

        getTableBookings()  
    }, [date])

    function deleteBooking(id) {
        db.collection("tableBookings").doc(id).delete()
            .then(() => {
                getTableBookings()
            })
    }
    
    function getTableBookings() {
        db.collection("tableBookings").where("date", ">", startTimestamp).where("date", "<", endTimestamp).get()
        .then(docs => {
            let tempList = []
            docs.forEach(doc => {
                let temp = doc.data()
                temp.id = doc.id
                tempList.push(temp)
            })
                   
            setTableBookingList(tempList)
        }).catch(error => {
            console.log(error.message)
        })
    }

    /* Item created which will be used to present in Flatlist.  */
    const Item = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title onPress={() => deleteBooking(item.id)}>{item.name} [X]</Card.Title>
            <Card.Divider/>
            <Text>Name: {item.name}</Text>
            <Text>Contact No: {item.contactNum}</Text>
            <Text>Group Size: {item.groupSize}</Text>
{/*             <Text>Date: {item.date}</Text> */}
            <Text>Timeslot: {item.timeslot} </Text>
        </Card>
    )
// handler to instruct floating button actions on what to do when pressed
// NetNinja video using on click handlers https://www.youtube.com/watch?v=PMX6GP1TXGo
    const handleClick = (name) => {
        if(name == "floatingRefresh") {
            getTableBookings()
        } 
    }

/*     useEffect(() => {
        let testDate = new Date()

        testDate.setHours(0,0,0,0)
        let startTimestamp = testDate.getTime()

        testDate.setHours(23,59,59,0)
        let endTimestamp = testDate.getTime()

       getTableBookings()
    }, [])
 */
    //NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

    // data = roomBookingList populated in getRoomBookings function
    // renderItem is the item to be displayed in the flatlist, i.e. the above card item
    // the key extractor is how the item is identified, in this case it is the id of each document retrieved from firestore. 
    // styles are simply how you wish to style the item with the below stylesheet
   
    // floating acion button being called below, link from: https://www.npmjs.com/package/react-native-floating-action
    
    return (
       <> 
            <DateTimePicker // date time picker code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
                value={date}
                mode={"date"}
                display="default"
                style={{width: "100%", marginBottom: 15, marginLeft: 8}}
                onChange={(event, date) => setDate(date)}
            />

             <FlatList
                data={tableBookingList}
                renderItem={Item}
                keyExtractor={item => item.id}
                style={styles.list}
            />
 
             <FloatingAction 
                actions={actions}
                onPressItem={name => handleClick(name) }
            />  
        </>        
    )
}


const styles = StyleSheet.create({
    view: {
       
  
    },
})

export default ViewTableBookings