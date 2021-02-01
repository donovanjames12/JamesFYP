import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { db } from "../firebase.js" 
import { Input, Button, Card } from "react-native-elements"  /* Importing conent from react-native elements library*/
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
 /* Add Room also on navigation panel, allowig user input data
 for price, room type and desciption information on useState
 here: https://reactjs.org/docs/hooks-state.html in addition to net ninja link on login.js */

 /* destructuring such as ({ navigation }) explined here: https://stackoverflow.com/questions/61217909/react-native-apis-why-use-destructuring-with-just-one-parameter
 in addition to be an occurring reference in the net ninja react native tutorial videos */
function AddRoom({navigation}) {
    const [price, setPrice] = useState("")
    const [roomType, setRoomType] = useState("")
    const [description, setDescription] = useState("")

    const [isRoomTypeValid, setIsRoomTypeValid] = useState(false)
    const [isPriceValid, setIsPriceValid] = useState(false)
    const [isDescriptionValid, setIsDescriptionValid] = useState(false)

    
    
    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />

    /* conditional rendering is used in the inputs, the constants created above are green and red ticks which will be displayed in the event of
     correct or incorrect information being inputted to notify the user, the condiions of the handlers
     are created below, then in the inputs at the bottom of this form, shorthand boolean (conditional rendering)
     is used to display either the red or green icon based on the conditions created, code on how 
     I learnt to do this can be seen in the official react navigation here: https://reactjs.org/docs/conditional-rendering.html */
    function handlePrice(amount) {
        setPrice(amount)

        if(amount.length < 1) {
            setIsPriceValid(false)
        } else {
            setIsPriceValid(true)
        }

    }
    function handleRoomType(roomType) {
        setRoomType(roomType)
        if(roomType.length < 1) {
            setIsRoomTypeValid(false)
        } else {
            setIsRoomTypeValid(true)
        }
    }

    function handleDescriptionType(description) {
        setDescription(description)
        if(description.length < 5) {
            setIsDescriptionValid(false)
        } else {
            setIsDescriptionValid(true)
        }
    }

     /* Adding inputted data to database from link https://firebase.google.com/docs/firestore/manage-data/add-data on firebase documentation */
   
      // Room cannot be added unless the conditions of all input handlers are met
   
     function addRoomToDB() {
        if(isPriceValid && isRoomTypeValid && isDescriptionValid) {
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
                alert(error.message)
            })
        }
       
    }

     /* input options for data, with button which calls above function to add data to database
     link to the varios input options in login.js at bottom*/

     // see shorthand conditional rendering as described above in rightIcon below
    return (  
        <>
        <Card style={styles.view}>  
            <Input 
                label="Price"
                style={styles.textInput} 
                onChangeText={text => handlePrice(text)} 
                value={price}
                leftIcon={<FontAwesome name="euro" size={20} color="grey" />}
                rightIcon={isPriceValid ? tickIcon : crossIcon}
                keyboardType="decimal-pad"
            />

            <Input 
                label="Room Type"
                style={styles.textInput} 
                onChangeText={text => handleRoomType(text)} 
                rightIcon={isRoomTypeValid ? tickIcon : crossIcon}
                value={roomType}
            />

            <Input 
                label="Description"
                style={styles.textInput} 
                onChangeText={text => handleDescriptionType(text)} 
                value={description}
                rightIcon={isDescriptionValid ? tickIcon : crossIcon}
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