import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import {Card, Button} from "react-native-elements"
import { db } from "../firebase.js" 

 /* This form is the exact same layout as RoomList */
function ViewRoomBooking({navigation}) {
    const [roomBookingList, setRoomBookingList] = useState("")

    /* Displaying room information from roomBookings collection in firebase
     Temp variable being used to retrieve all elements of roomBookings */
    function getRoomBookings() {
        db.collection("roomBookings").get()
            .then(docs => {
                var tempList = []
                docs.forEach(doc => {
                    var temp   
                    temp = doc.data()
                    temp.id = doc.id
                    tempList.push(temp)
                })
                setRoomBookingList(tempList)
            }).catch(error => {
                console.log(error.message)
            })
    }

    // exact same as RoomList, used to fix firestore usage glitch from getRoomBookings.
    // Runs when component is finished rendering. Youtube link on RoomList.
    useEffect(() => {
        getRoomBookings()
    }, [])

     /* delete room function to removed room item from db and UI, code for this function was acquired here:
    https://firebase.google.com/docs/firestore/manage-data/delete-data*/
    function deleteBooking(id) {
        db.collection("roomBookings").doc(id).delete()
            .then(() => {
                getRoomBookings()
            }).catch(error => {
                console.log(error.message)
            })
    }

    /* Item created which will be used to present in Flatlist. JSX in blue is useState variables created in 
    AddRoomBookings.  */
    const Item = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title onPress={() => deleteBooking(item.id)}>{item.name} [X]</Card.Title>
            <Card.Divider/>
            <Text>{item.fromDate} - {item.toDate}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Contact No: {item.contactNo}</Text>
            <Text>Group Size: {item.groupSize}</Text>
            <Text>Card No: {item.cardNo}</Text>
        </Card>
    )



/* returning room list on UI from database flatlist link https://reactnative.dev/docs/flatlist 
    NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

    // data = roomBookingList created in getRoomBookings function
    // renderItem is the item to be displayed in the flatlist, i.e. the above card item
    // the key extractor is how the item is identified, in this case it is by the firestore database ID.
    // styles are simply howyou wish to style the item with the below stylesheet
    return (
        <ScrollView style={styles.view}>
             <FlatList
                data={roomBookingList}
                renderItem={Item}
                keyExtractor={item => item.id}
                style={styles.list}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
       
    }
})

export default ViewRoomBooking