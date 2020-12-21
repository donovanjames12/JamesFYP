import React, {useState} from 'react'
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Card, Input, Text} from 'react-native-elements'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import {auth} from "../firebase"

function Login ({navigation}) {
    const image = {uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/The-Vee-pass.jpg?alt=media&token=4a725138-b7ff-41fe-819a-0255a4a68baf"}
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Main')
            }).catch(error => {
                alert(error.message)
                console.log(error.message)
            })
    }
    return (
        

        <ImageBackground source={image} style={styles.background}>

        <View style={styles.view}>
                <Card style={styles.card}>

                    <Input 
                        label="Email"
                        style={styles.textInput} 
                        leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
                        onChangeText={text => setEmail(text)} 
                        value={email}
                    />

                    <Input 
                        label="Password"
                        style={styles.textInput}   
                        secureTextEntry={true}
                        leftIcon={<AntDesign name="lock" size={24} color="grey" />}
                        onChangeText={text => setPassword(text)} 
                        value={password}
                    />

                    <Card.Title style={styles.link} onPress={() => navigation.navigate("Registration")}>Create Account</Card.Title>


                    <Button style={styles.text} title="Login" onPress={() => login()}/>
                </Card>
           
        </View>
        </ImageBackground>

        
    )
}

const styles = StyleSheet.create({
    view: {
        margin: "auto",
        marginTop: 75,
        
        
    },
    card: {
        width: "100%"
    },
    link: {
        marginTop: 15,
        marginBottom: 25,
        fontSize: 15
    },
    background: {
        height: "100%",
        width: "100%"
    }
    
})

export default Login