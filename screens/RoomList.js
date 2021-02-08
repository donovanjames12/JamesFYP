import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import { db } from "../firebase"  /* Linking firebase to component */
import {Card, Button, PricingCard } from "react-native-elements" /* adding react native elements library */
import { AntDesign } from '@expo/vector-icons';




/* Room List added to navigation slider*/
function RoomList({navigation}) {
     /*Creating a constant to store room list inputs, cannot be changed with useState */
    const [roomList, setRoomList] = useState("")
    
     /* 
        All documents being retrieved from "rooms" collection.
        They are stored in an array in "docs" variable.  
        ForEach loops through this array. 
       */

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
        }).catch(error => {
            alert(error.message)
        })
    }

   
 /* useEffect used to only call firestore database once or when changes are made to 
 the room list being displayed, firestore database was becoming locked without useEffect due to large
 numbes of database requests being continuouslly made while page was open, using up free usage,
 this bug was fixed with useEffect, information on how to use it was got from the 
 following link: https://www.youtube.com/watch?v=K4xfCIRuf54 */
    useEffect(() => {
        getRooms()
    }, []) 
    
    /* delete room function to removed room item from db and UI, code for this function was acquired here:
    https://firebase.google.com/docs/firestore/manage-data/delete-data*/
    function deleteRoom(roomId) {
        db.collection("rooms").doc(roomId).delete()
            .then(() => {
                getRooms()
            }).catch(error => {
                console.log(error.message)
            })
        
    }

    /* displaying stored rooms in a card format, sample code obtained from https://reactnativeelements.com/ */
   /* Item is created and destructured within cards to display added room information, 
   code on how items can be destructured can be seen in this youtube link: https://www.youtube.com/watch?v=5_PdMS9CLLI
   through destructuring an item I could break it downto be displayed in addition to being able
   delete the card item from the database via its ID which is unique to each item. */
   
   
    const item = ({ item }) => (
        <Card>
            <Card.Title onPress={() => deleteRoom(item.id)}>
                <Text>{item.roomType} [X]</Text>
            </Card.Title>
            <Card.Divider/>
            <Card.Title>  
                <Text>€{item.price} per night</Text>
            </Card.Title>
            <Card.Title>
                <Text>{item.description}</Text>
            </Card.Title>
            <Card.Image source={{uri: 'https://diowf2xvnqim4.cloudfront.net/045/060/001/24109/800x600.jpg'}} />
            <Button title="Book" style={styles.button} onPress={() => navigation.navigate("Add Room Booking", {
                room: item
            })}/>
        </Card>
    )
    
    /* returning room list on UI from database flatlist link https://reactnative.dev/docs/flatlist 
    NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

     // data = roomBookingList created in getRoomBookings function
    // renderItem is the item to be displayed in the flatlist, i.e. the above card item
    // the key extractor is how the item is identified, in this case it is the id of each document retrieved from firestore. 
    // styles are simply how you wish to style the item with the below stylesheet

    

    return (
       
        <>
        
            <FlatList
                data={roomList}
                renderItem={item}
                keyExtractor={item => item.id}
                style={styles.list}
            />
            <Button title="Add Room" onPress={() => navigation.navigate("Add Room")} />
            <Button title="Refresh" onPress={getRooms} />
         
           
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