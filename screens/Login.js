import React, {useState} from 'react'
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Card, Input, Text} from 'react-native-elements'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import {auth} from "../firebase"

function Login ({navigation}) {
    const image = {uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/The-Vee-pass.jpg?alt=media&token=4a725138-b7ff-41fe-819a-0255a4a68baf"}
    
    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false)

    const [password, setPassword] = useState("")

    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    function login() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Main')
            }).catch(error => {
                alert(error.message)
                console.log(error.message)
     
            })
    }

    function handleEmail(email) {
        setEmail(email)

        if(emailFormat.test(email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }
    return (
        

        <ImageBackground source={image} style={styles.background}>

        <View style={styles.view}>
                <Card style={styles.card}>

                    <Input 
                        label="Email"
                        style={styles.textInput} 
                        leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
                        rightIcon={emailValid ? <MaterialIcons name="email" size={24} color="green" /> : <AntDesign name="lock" size={24} color="grey" />}
                        onChangeText={text => handleEmail(text)} 
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