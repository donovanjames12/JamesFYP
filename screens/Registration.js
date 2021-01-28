import React, {useState} from 'react'
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Card, Input, Text} from 'react-native-elements'
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { auth, db } from '../firebase';

/* identical layout to login.js apart from the register() function */
function Registration ({navigation}) {
    const image = {uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/The-Vee-pass.jpg?alt=media&token=4a725138-b7ff-41fe-819a-0255a4a68baf"}

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isNameValid, setIsNameValid] = useState(false)

    const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />
    

    function handleEmail(email) {
        setEmail(email)

        if(emailFormat.test(email)) {
            setIsEmailValid(true)
        } else {
            setIsEmailValid(false)
        }
    }

    function handlePassword(password) {
        setPassword(password)

        if(password.length < 6) {
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true)
        }
    }

    function handleName(name) {
        setName(name)

        if(name.length < 1) {
            setIsNameValid(false)
        } else {
            setIsNameValid(true)
        }
    }

    /* register function code aqcuired here: https://rnfirebase.io/auth/usage */
    /* code on how to add docs to db here: https://firebase.google.com/docs/firestore/manage-data/add-data */
    function register() {
        if(isEmailValid && isPasswordValid && isNameValid) {
            auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                alert("Account created, you may now login")
                db.collection("users").doc(user.user.uid).set({
                    name: name
                }).catch(error => {
                    console.log(error.message)
                })
                navigation.navigate('Login') 
            }).catch(error => {
                alert(error.message)
            })   
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
                    rightIcon={isEmailValid ? tickIcon : crossIcon}
/*                     if(isEmailValid == true) 
                    {
                        tickIcon
                    }else {
                        crossIcon
                    } */
                    onChangeText={text => handleEmail(text)} 
                    value={email}
                />

                <Input 
                    label="Password"
                    style={styles.textInput}   
                    secureTextEntry={true}
                    leftIcon={<AntDesign name="lock" size={24} color="grey" />}
                    rightIcon={isPasswordValid ? tickIcon : crossIcon}
                    onChangeText={text => handlePassword(text)} 
                    value={password}
                />

                <Input 
                    label="Name"
                    style={styles.textInput}   
                    leftIcon={<MaterialCommunityIcons name="face-profile" size={24} color="grey" />}
                    rightIcon={isNameValid ? tickIcon : crossIcon} 
                    onChangeText={text => handleName(text)} 
                    value={name}
                />

                <Card.Title style={styles.link} onPress={() => navigation.navigate("Login")}>Already Have an Account?</Card.Title>

                <Button style={styles.text} title="Register" onPress={register}/>
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

export default Registration
