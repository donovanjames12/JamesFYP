import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import {Card, Button} from "react-native-elements"
import { db } from "../firebase.js" 
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons'
import DatePicker from "components/DatePicker"
import {formatDate} from "../helpers"
import { FontAwesome } from '@expo/vector-icons'; 

 /* declaring use state variables*/
function ViewTableBookings({navigation}) {
    const [tableBookingList, setTableBookingList] = useState([])
    const [start, setStart] = useState(setStartDate)
    const [end, setEnd] = useState(setEndDate) 

    // same as floating button in view room bookings
     const actions = [
        {
            text: "Refresh",
            icon: <AntDesign name="retweet" size={24} color="white" />,
            name: "floatingRefresh",
            position: 1
        },
    ]; 

    // getting start and end of day code https://stackoverflow.com/questions/8636617/how-to-get-start-and-end-of-day-in-javascript/8636674
     // function to set date picker start date at midnight
    function setStartDate() {
        let x = new Date()
        x.setHours(0,0,0,0)
        return x
    }
 
    // end date et to 23:59
    function setEndDate() {
        let x = new Date()
        x.setHours(23, 59, 59, 999)
        return x
    }

    
    // Runs when component is finished rendering. Youtube link on RoomList.
    useEffect(() => {     
        getTableBookings()
    }, [start, end])

    /* delete room function to removed room item from db and UI, code for this function was acquired here:
    https://firebase.google.com/docs/firestore/manage-data/delete-data*/
    function deleteBooking(id) {
        db.collection("tableBookings").doc(id).delete()
            .then(() => {
                getTableBookings()
            })
    }
    // example of querying firestore data https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
    function getTableBookings() {
        db.collection("tableBookings").where("date", ">", start).where("date", "<", end).get()
            .then(docs => {
                let tempList = []
                docs.forEach(doc => {
                    let temp = doc.data()
                    temp.id = doc.id
                    tempList.push(temp)
                })
           // database queried to display data between entered dates and retrieve bookings from this range
                setTableBookingList(tempList)
        }).catch(error => {
            alert(error.message)
        })
    }

    /* Item created which will be used to present in Flatlist.  */
    const Item = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.row}>
                <View style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{item.name}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome 
                        name="trash-o" 
                        size={24} 
                        color="black" 
                        style={{marginLeft: "auto"}} 
                        onPress={() => deleteBooking(item.id)} />
                </View>
            </View>
            
            <Card.Divider/>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={{fontWeight: "bold"}}>Group Size</Text>
                    <Text style={{fontWeight: "bold"}}>Contact Num</Text>
                    <Text style={{fontWeight: "bold"}}>Timeslot</Text>
                    <Text style={{fontWeight: "bold"}}>Date</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.groupSize}</Text>
                    <Text>{item.contactNum}</Text>
                    <Text>{item.timeslot}</Text>
                    <Text>{formatDate(item.date.toDate())}</Text>
                </View>
            </View>
        </Card>
    )
// handler to instruct floating button actions on what to do when pressed
// NetNinja video using on click handlers https://www.youtube.com/watch?v=PMX6GP1TXGo
    const handleClick = (name) => {
        if(name == "floatingRefresh") {
            getTableBookings()
        } 
    }
    //NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

    // data = roomBookingList populated in getRoomBookings function
    // renderItem is the item to be displayed in the flatlist, i.e. the above card item
    // the key extractor is how the item is identified, in this case it is the id of each document retrieved from firestore. 
    // styles are simply how you wish to style the item with the below stylesheet
   
    // floating acion button being called below, link from: https://www.npmjs.com/package/react-native-floating-action
   
    return (
       <>   
            <View style={{display: "flex", flexDirection: "row", marginTop: 10, marginBottom: 15}}>
                <DatePicker date={start} setDate={setStart} style={{flexGrow: 1, marginLeft: 40}}/>                 
                <DatePicker date={end} setDate={setEnd} style={{flexGrow: 1, marginLeft: 20}}/>
            </View>

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
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 8
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    }
})

export default ViewTableBookings