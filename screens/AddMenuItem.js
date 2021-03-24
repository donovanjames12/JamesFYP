import React, { useState, useEffect } from "react"
import { Input, Button, Image, Card } from "react-native-elements"
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from "../firebase";

function AddMenuItem({navigation}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

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

      async function uploadImage(id){
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = storage.ref().child(`menu/${id}`);
        const snapshot = await ref.put(blob);
        return snapshot.downloadURL;
    }

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
    }

    function add() {
        db.collection("menu").add({
            title: title,
            description: description,
            price: parseFloat(price)
        }).then(docRef => {
            uploadImage(docRef.id) // adding image to uploaded room
            alert("Added Successfully")
            setTitle("")
            setPrice("")
            setDescription("")
            setImage(null)
            navigation.navigate("Takeaway List")
        }).catch(error => {
            alert(error.message)
        })
    }

    return (
        <>  
            <Card>
                <Input 
                    label="Title"
                    onChangeText={text => setTitle(text)} 
                    value={title}
                />

                <Input 
                    label="Description"
                    onChangeText={text => setDescription(text)} 
                    value={description}
                    multiline={true}
                />

                <Input 
                    label="Price"
                    onChangeText={text => setPrice(text)} 
                    value={price}
                    multiline={true}
                    keyboardType="decimal-pad"
                />

                <Button title="Select Image" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}   

                <Button title="Add" onPress={add}/>
            </Card>    
        </>
    )
}

export default AddMenuItem