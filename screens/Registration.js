import React, {useState} from 'react'
import { StyleSheet, View, ImageBackground } from "react-native"
import { Button, Card, Input, Text} from 'react-native-elements'
import { MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
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
    
    /* The below constant is email regex, regex can be used as test validation for inputs such
    as emails, currencies etc. different variations are used and created by people online,
    anyone can make them if they know how, I copied this from a stack overflow forum.
    I use the regex in the below email handler to test if the user is registering with
    a valid email or not. https://emailregex.com/ */ 
    const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    const tickIcon = <AntDesign name="check" size={24} color="green" />
    const crossIcon = <Entypo name="cross" size={24} color="red" />
    
      /* conditional rendering is used in the inputs, the constants created above are green and red ticks which will be displayed in the event of
     correct or incorrect information being inputted to notify the user, the condiions of the handlers
     are created below, then in the inputs at the bottom of this form, shorthand boolean (conditional rendering)
     is used to display either the red or green icon based on the conditions created, code on how 
     I learnt to do this can be seen in the official react navigation here: https://reactjs.org/docs/conditional-rendering.html */
   //  // https://www.w3schools.com/jsref/jsref_regexp_test.asp
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
        
    // Room cannot be added unless the conditions of all input handlers are met

    /* firebase auth used to register account, then result object is created
    which contains the users information, the users ID is then obtained from this
    object information and is used to store the uses name in the firestore database. */
   
    function register() {
        if(isEmailValid && isPasswordValid && isNameValid) {
            auth.createUserWithEmailAndPassword(email, password) 
            .then(result => {
                alert("Account created, you may now login")
                db.collection("users").doc(result.user.uid).set({
                    name: name,
                    type: "user"
                }).catch(error => {
                    console.log(error.message)
                })
                navigation.navigate('Login') 
            }).catch(error => {
                alert(error.message)
            })   
        }   
    }

    // see shorthand conditional rendering as described above in rightIcon below
    return (
        <ImageBackground source={image} style={styles.background}>

            <View style={styles.view}>
                <Card style={styles.card}> 

                <Input 
                    label="Email"
                    style={styles.textInput} 
                    leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
                    rightIcon={isEmailValid ? tickIcon : crossIcon}
                  // the below code shows what the above conditional rendering is doing
                    /*  if(isEmailValid == true) 
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
                    leftIcon={<Entypo name="user" size={24} color="grey" />}
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
