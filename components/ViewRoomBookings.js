import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import {Card, Button} from "react-native-elements"
import { db } from "../firebase.js" 

 /* Room inputs as props as they can vary and change, returning inputted data */
function ViewRoomBooking({navigation}) {
    const [roomBookingList, setRoomBookingList] = useState("")

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
                console.log(console.log(tempList))
            }).catch(error => {
                console.log(error.message)
            })
    }

    useEffect(() => {
        getRoomBookings()
    }, [])

    function deleteBooking(id) {
        db.collection("roomBookings").doc(id).delete()
            .then(() => {
                getRoomBookings()
            }).catch(error => {
                console.log(error.message)
            })
    }

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