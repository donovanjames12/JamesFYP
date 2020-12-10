import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { PricingCard, Button, Card, Text} from 'react-native-elements';
import { db } from "../firebase"

 /* Room inputs as props as they can vary and change, returning inputted data */
function Room({navigation, route}) {
    const [room, setRoom] = useState([])

    db.collection("rooms").doc(route.params.roomId).get()
        .then(doc => {
            console.log(doc.data())
            setRoom(doc.data())
            console.log(room)
        }).catch(error => {
            console.log(error.message)
        })
    return (
        <View style={styles.view}>
            <Card style={styles.card}>
                <Card.Title>{room.roomType}</Card.Title>
                <Card.Divider/>
                <Card.Title>€{room.price} per night</Card.Title>
                <Card.Title>{room.description}</Card.Title>
                <Card.Image source={{uri: 'https://diowf2xvnqim4.cloudfront.net/045/060/001/24109/800x600.jpg'}} />
                <Button title="Book" style={styles.button}/>
            </Card>
            <Card style={styles.card}>
            <Card.Title>{room.roomType}</Card.Title>
            <Card.Divider/>
            <Card.Title>€{room.price} per night</Card.Title>
            <Card.Title>{room.description}</Card.Title>
            <Card.Image source={{uri: 'https://diowf2xvnqim4.cloudfront.net/045/060/001/24109/800x600.jpg'}} />
            <Button title="Book" style={styles.button}/>
        </Card>
        <Card style={styles.card}>
                <Card.Title>{room.roomType}</Card.Title>
                <Card.Divider/>
                <Card.Title>€{room.price} per night</Card.Title>
                <Card.Title>{room.description}</Card.Title>
                <Card.Image source={{uri: 'https://diowf2xvnqim4.cloudfront.net/045/060/001/24109/800x600.jpg'}} />
                <Button title="Book" style={styles.button}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        overflow: "visible",
        backgroundColor: 'white',
        flex: 1,
       
    
    },
    card: {
        
    },
    button: {
        marginTop: 20
    }
})

export default Room