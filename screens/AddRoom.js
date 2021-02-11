import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { db } from "../firebase.js" 
import { Input, Button, Card } from "react-native-elements"  /* Importing conent from react-native elements library*/
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
 

 /* destructuring such as ({ navigation }) explined here: https://stackoverflow.com/questions/61217909/react-native-apis-why-use-destructuring-with-just-one-parameter
 in addition to be an occurring reference in the net ninja react native tutorial videos */
 
 // Basically means that for example I can say navigation.navigate instead of props.navigation.navigate

 function AddRoom({navigation}) {
    
    //NetNinja explaning useState via Youtube:  https://www.youtube.com/watch?v=1FiIYaRr148 
    const [price, setPrice] = useState("") // initial useState Values in brackets
    const [roomType, setRoomType] = useState("") // they are null here as I am taking inputted data
    const [description, setDescription] = useState("")

    const [isRoomTypeValid, setIsRoomTypeValid] = useState(false) // they are false here as I am using boolean and conditional rendering
    const [isPriceValid, setIsPriceValid] = useState(false)
    const [isDescriptionValid, setIsDescriptionValid] = useState(false)

    
    // Creating icons to be used for input validation, icon code link here:  https://icons.expo.fyi/
    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />

    /* conditional rendering is used in the inputs, the constants created above are green and red ticks which will be displayed in the event of
     correct or incorrect information being inputted to notify the user, the condiions of the handlers
     are created below, then in the inputs at the bottom of this form, shorthand boolean (conditional rendering)
     is used to display either the red or green icon based on the conditions created, code on how 
     I learnt to do this can be seen in the official react documentation here: https://reactjs.org/docs/conditional-rendering.html */
    function handlePrice(amount) {
        setPrice(amount)

        if(amount.length < 1) {
            setIsPriceValid(false)
        } else {
            setIsPriceValid(true)
        }

        // eg: if roomtype input length is less than one, cross icon appears,
        // otherwise, if conditions are met, the tick icon appears
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
                price: price,     // once conditions met, data is added to rooms collection
                roomType: roomType,
                description: description, 
            }).then(() => {
                setPrice("")     // once added, the room fields are cleared again for future input
                setRoomType("")
                setDescription("")
                navigation.goBack()  // function called when below button is clicked and returns user to previous page 
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
                onChangeText={text => handlePrice(text)} // when text is entered, handler requirements checked
                value={price}
                leftIcon={<FontAwesome name="euro" size={20} color="grey" />}
                rightIcon={isPriceValid ? tickIcon : crossIcon} //conditional rendering using above constants and handlers
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