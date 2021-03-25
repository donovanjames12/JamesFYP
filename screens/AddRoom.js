import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import { db, storage } from "../firebase.js" 
import { Input, Button, Card } from "react-native-elements"  /* Importing conent from react-native elements library*/
import { FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function AddRoom({navigation}) {
    
    //NetNinja explaning useState via Youtube:  https://www.youtube.com/watch?v=1FiIYaRr148 
    const [price, setPrice] = useState("") // initial useState Values in brackets
    const [roomType, setRoomType] = useState("") // they are null here as I am taking inputted data
    const [description, setDescription] = useState("")
    const [roomNo, setRoomNo] = useState("")

    const [isRoomTypeValid, setIsRoomTypeValid] = useState(false) // they are false here as I am using boolean and conditional rendering
    const [isPriceValid, setIsPriceValid] = useState(false)
    const [isRoomNoValid, setIsRoomNoValid] = useState(false)
    const [isDescriptionValid, setIsDescriptionValid] = useState(false)
    
    // Creating icons to be used for input validation, icon code link here:  https://icons.expo.fyi/
    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />

    // image picker code aqcuired from the following link: https://docs.expo.io/versions/latest/sdk/imagepicker/
    // useEffect essentially identifying platform and the requesting permission to library access
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);

      //code also from the above link, launches image library
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    /* conditional rendering is used in the inputs, the constants created above are green and red ticks which will be displayed in the event of
     correct or incorrect information being inputted to notify the user, the condiions of the handlers
     are created below, then in the inputs at the bottom of this form, shorthand boolean (conditional rendering)
     is used to display either the red or green icon based on the conditions created, code on how 
     I learnt to do this can be seen in the official react documentation here: https://reactjs.org/docs/conditional-rendering.html */
     // see inline if-else conditional operator 
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

    function handleRoomNo(roomNo) {
        setRoomNo(roomNo)
        if(roomNo.length < 1) {
            setIsRoomNoValid(false)
        } else {
            setIsRoomNoValid(true)
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
            db.collection("rooms").add({
                price: price,     // once conditions met, data is added to rooms collection
                roomType: roomType,
                description: description,
                roomNo: roomNo, 
            }).then(docRef => {
                uploadImage(docRef.id) // adding image to uploaded room

                setPrice("")     // once added, the room fields are cleared again for future input
                setRoomType("")
                setDescription("")
                setRoomNo("")
                navigation.goBack()  // function called when below button is clicked and returns user to previous page 
             /* error message if room addition unsuccessful*/ 
            }).catch(error => {
                alert(error.message)
            })
        }
    
    }

    // code acquired from the following: https://medium.com/@wcandillon/uploading-images-to-firebase-with-expo-a913c9f8e98d
    //blob is a new feature to upload images directly to firebase
    async function uploadImage(id){
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = storage.ref().child(`rooms/${id}`);
        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    }

     /* input options for data, with button which calls above function to add data to database
     link to the varios input options in login.js at bottom*/

     // see shorthand conditional rendering as described above in rightIcon below
    return (  
        <>
        <Card style={styles.view}>  
            <Input 
                label="Price Per-Night"
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
                label="Room Number"
                style={styles.textInput} 
                onChangeText={text => handleRoomNo(text)} 
                rightIcon={isRoomNoValid ? tickIcon : crossIcon}
                value={roomNo}
                keyboardType="number-pad"
            />

            <Input 
                label="Description"
                style={styles.textInput} 
                onChangeText={text => handleDescriptionType(text)} 
                value={description}
                rightIcon={isDescriptionValid ? tickIcon : crossIcon}
            />


        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} 
        <Button title="Add Room" onPress={addRoomToDB}/>
        </Card>

        </>
        // once an image is selected it appears on screen with above code beneath pick image
    )
}

const styles = StyleSheet.create({

})

export default AddRoom