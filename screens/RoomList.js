import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import { db, storage } from "../firebase"  /* Linking firebase to component */
import {Card, Button, PricingCard } from "react-native-elements" /* adding react native elements library */
import { AntDesign } from '@expo/vector-icons';
import { FloatingAction } from "react-native-floating-action";
import { useAuth } from "components/AuthContext"
import { FontAwesome } from '@expo/vector-icons'; 


/* Room List added to navigation slider*/
function RoomList({navigation}) {
     /*Creating a constant to store room list inputs, cannot be changed with useState */
    const [roomList, setRoomList] = useState("")
    const { userType } = useAuth()
    
    // code is for the floating button, code obtained here: https://www.npmjs.com/package/react-native-floating-action
    // once floating button is clicked, this is what appears

    let actions = []

    if(userType == "admin") { // again, conditional rendering to hide add room option unless an admin
        actions = [
            {
                text: "Refresh",
                icon: <AntDesign name="retweet" size={24} color="white" />,
                name: "floatingRefresh",
                position: 1
            }, 
            {
                text: "Add Room",
                icon: <AntDesign name="addfile" size={24} color="white" />,
                name: "floatingAdd",
                position: 2
            }
        ]
    } else {
        actions = [
            {
                text: "Refresh",
                icon: <AntDesign name="retweet" size={24} color="white" />,
                name: "floatingRefresh",
                position: 1
            }, 
        ]
    }

     /* 
        Function to retrieve rooms data from firestore 
       */

    function getRooms() {
        db.collection("rooms").get() // retrieving data stored in rooms document
        .then(docs => {              // if successful, result stored in docs   
            var tempList = []        // empty array used to store tempRoom

            docs.forEach(doc => { 
                var tempRoom           // Temporary variable for storing info
                tempRoom = doc.data() // Temporary variable now has desired document data
                tempRoom.id = doc.id  // document ID external to document data, it is needed to identify rooms booked/deleted, therefore it is added to temporary variable
                tempList.push(tempRoom) //Temporary variable being pushed onto tempList array
            })
            
           setRoomList(tempList) // setting the permanent useState list equal to the tempList array
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
    
    /* delete room function to remove room item from db and UI, code for this function was acquired here:
    https://firebase.google.com/docs/firestore/manage-data/delete-data */
    function deleteRoom(roomId) {
        db.collection("rooms").doc(roomId).delete()
            .then(() => {
                getRooms()
            }).catch(error => {
                
            })
        
    }

    /* displaying stored rooms in a card format, sample code obtained from https://reactnativeelements.com/ */
  //NetNinja explains item breakdown in flatlist video below
   
   
    const item = ({ item }) => (
        <Card>
            { 
                userType == "admin" // conditional rendering so admin can only deletea room from the UI
                ? 
                <View style={styles.row}>
                    <View style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <Text>{item.roomType}</Text>
                    </View>
                    <View style={styles.column}>
                        <FontAwesome 
                            name="trash-o" 
                            size={24} 
                            color="black" 
                            style={{marginLeft: "auto"}} 
                            onPress={() => deleteRoom(item.id)} />
                    </View>
                </View>
                :
                <Card.Title>
                    <Text>{item.roomType}</Text>
                </Card.Title>
            }
             

            <Card.Divider/>
            <Card.Title>  
                <Text>Room Number: {item.roomNo}</Text>
            </Card.Title>
            <Card.Title>  
                <Text>€{item.price} per night</Text>
            </Card.Title>
            <Card.Title>
                <Text>{item.description}</Text>
            </Card.Title> 
            <Card.Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/rooms%2F${item.id}?alt=media&token=9eb07b90-e91e-43ba-9def-966c563b6b82`}} /> 
            <Button title="Book" style={styles.button} onPress={() => navigation.navigate("Add Room Booking", {
                room: item
            })}/>
        </Card>
    )
    
   // NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

// handler to instruct floating button actions on what to do when pressed
// NetNinja video using on click handlers https://www.youtube.com/watch?v=PMX6GP1TXGo
const handleClick = (name) => {
    if(name == "floatingAdd") {
        navigation.navigate("Add Room")
    } else if (name == "floatingRefresh") {
        getRooms()
    }
}
    // data = roomList populated in getRooms function
// renderItem is the item to be displayed in the flatlist, i.e. the above card item
// the key extractor is how the item is identified, in this case it is the id of each document retrieved from firestore. 
// styles are simply how you wish to style the item with the below stylesheet
  
 // floating acion button being called below, link from: https://www.npmjs.com/package/react-native-floating-action
    return (     
        <>      
            <FlatList
                data={roomList}
                renderItem={item}
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
    },
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
export default RoomList