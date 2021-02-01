import { StatusBar } from 'expo-status-bar'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { ThemeProvider, Button, } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigation/StackNavigation"


/* Creating a theme which can be usedd application-wide linke at https://reactnativeelements.com/docs/customization/  */
const theme = {
  Button: {
    
  },
}



/* The drawer inputs placed wihin a themeprovidor 
which ensures it is used across all components mentioned within return statement*/
 
/* The app compnent is the central component of the whole project,
the navigation container is essentially storing my whole project as the stack navigator
contains all screens (drawer navigation also part of the stack) Information on 
the navigation container can be seen here at he official ract documenatation: https://reactnative.dev/docs/navigation */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>       
        <StackNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

/* Stylesheets in every reative native component to be used in page styling
link here https://reactnative.dev/docs/stylesheet */
