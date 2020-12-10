import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import { db } from "../firebase"  /* Linking firebase to component */
import {Card, Button, PricingCard } from "react-native-elements" /* adding react native elements library */
import { AntDesign } from '@expo/vector-icons';



/* Room List added to navigation slider*/
function RoomList({navigation}) {
     /*Creating a constant to store room list inputs, cannot be changed with useState */
    const [roomList, setRoomList] = useState("")
    
     /* Displaying room information from rooms collection in firebase
     Temp variable being used to all elements of room including ID
     Firebase returns large amounts of unnecessary data info, only id, price, type and description required  */

    function getRooms() {
        db.collection("rooms").get()
        .then(docs => {
            var tempList = []
            docs.forEach(doc => {
                var tempRoom    
                tempRoom = doc.data()
                tempRoom.id = doc.id
                tempList.push(tempRoom)
            })
            setRoomList(tempList)
            console.log(console.log(tempList))
        }).catch(error => {
            alert(error.message)
        })
    }

    useEffect(() => {
        getRooms()
    }, [])
    
    function deleteRoom(roomId) {
        db.collection("rooms").doc(roomId).delete()
            .then(() => {
                getRooms()
            }).catch(error => {
                console.log(error.message)
            })
        
    }

    /* displaying stored rooms in a card format, sample code obtained from https://reactnativeelements.com/ */
    const Item = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title onPress={() => deleteRoom(item.id)}>{item.roomType} [X]</Card.Title>
            <Card.Divider/>
            <Card.Title>€{item.price} per night</Card.Title>
            <Card.Title>{item.description}</Card.Title>
            <Card.Image source={{uri: 'https://diowf2xvnqim4.cloudfront.net/045/060/001/24109/800x600.jpg'}} />
            <Button title="Book" style={styles.button} onPress={() => navigation.navigate("Add Room Booking", {
                room : item
            })}/>
        </Card>
    )
    
    /* returning room list on UI from database*/
    return (
        <>
            <View style={styles.view}>
                <FlatList
                    data={roomList}
                    renderItem={Item}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
                    <Button title="Add Room" onPress={() => navigation.navigate("Add Room")} />
{/*                     <Button title="Refresh" onPress={() => getRooms()} />
 */}            </View>
        </>
    )
} 

const styles = StyleSheet.create({
    item: {
        
    },
    view: {
        flex: 1, 
    },
    list: {
        width: "100%"
        
    },
    button: {
        marginTop: 20
    }
})
export default RoomList