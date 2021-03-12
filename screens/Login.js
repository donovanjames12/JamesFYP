import React, {useState} from 'react'
import { StyleSheet, View, ImageBackground, SafeAreaView } from "react-native"
import { Button, Card, Input, Text} from 'react-native-elements'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import {auth} from "../firebase"


function Login ({navigation}) {
    const image = {uri: "https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/The-Vee-pass.jpg?alt=media&token=4a725138-b7ff-41fe-819a-0255a4a68baf"}
    
    /* youtube link explaining useState from NetNinja https://www.youtube.com/watch?v=1FiIYaRr148  */

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   
     /* login function code acquired at firebase documentation here: https://firebase.google.com/docs/auth/web/password-auth */
    /* navigation.navigate function used to move between screens with react navigation see: https://reactnavigation.org/docs/navigating/ */
   
     function login() {
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {             
            }).catch(error => {
                alert(error.message)
            })
    }

    return (    
        /* using useState with Inputs explained on YouTube by NetNinja https://www.youtube.com/watch?v=c9Sg9jDitm8 */
        /* code for input icons i.e. login + password icons in inputs here: https://icons.expo.fyi/ */
       
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
       
/* the various props inputs in react native elements can take https://reactnativeelements.com/docs/input/ */
/* using image backgrounds https://reactnative.dev/docs/imagebackground */
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
    },
    container: {
        backgroundColor: '#fff',
        width: "100%",
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto"
    },
    
})

export default Login