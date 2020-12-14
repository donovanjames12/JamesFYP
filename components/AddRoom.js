
import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { db } from "../firebase.js" 

import { Input, Button, Card } from "react-native-elements"  /* Importing conent from react-native elements library*/

 /* Add Room also on navigation panel, allowig user input data
 for price, room type and desciption */
function AddRoom({navigation}) {
    const [price, setPrice] = useState("")
    const [roomType, setRoomType] = useState("")
    const [description, setDescription] = useState("")

     /* Adding inputted data to database*/
    function addRoomToDB() {
        db.collection("rooms").doc().set({
            price: price,
            roomType: roomType,
            description: description
        }).then(() => {
            setPrice("")
            setRoomType("")
            setDescription("")
            navigation.goBack()

         /* error message if room addition unsuccessful*/ 
        }).catch(error => {
            console.log(error.message)
        })
    }

     /* input options for data, with button which calls above function to add data to database*/
    return (  
        <>
        <Card style={styles.view}>  
            <Input 
                label="Price"
                style={styles.textInput} 
                onChangeText={text => setPrice(text)} 
                value={price}
            />


            <Input 
                label="Room Type"
                style={styles.textInput} 

                onChangeText={text => setRoomType(text)} 
                value={roomType}
            />


            <Input 
                label="Description"
                style={styles.textInput} 

                onChangeText={text => setDescription(text)} 
                value={description}
            />

            <Button title="Add Room" onPress={addRoomToDB}/>

        </Card>

        </>
    )
}

const styles = StyleSheet.create({
/*     view: {
        maxWidth: "1000px",
        margin: "auto"
    } */
})

export default AddRoom