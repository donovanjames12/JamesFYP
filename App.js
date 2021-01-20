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

/* Declaring drawer navigator method*/
/*Drawer navigation code https://reactnavigation.org/docs/drawer-based-navigation/ */
/* stack navigator documenatation https://reactnavigation.org/docs/stack-navigator */


 /* navigation property passed down from stack navigator i.e. 'navigation.goBack' 
 used across application and obtained from https://reactnavigation.org/docs/navigation-prop  */




/* The drawer inputs placed wihin a themeprovidor 
which ensures it is used across all components mentioned within return statement*/
 /*rootstack.navigator passes navigation prop to every screen (i.e. screens that can access navigation)*/
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
