import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState, useContext } from 'react'
import { LogBox } from 'react-native'
import { ThemeProvider, Button, Text} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigation/StackNavigation"
import { auth, db } from "./firebase"
import { AuthProvider } from "components/AuthContext"

/* Creating a theme which can be usedd application-wide link at https://reactnativeelements.com/docs/customization/  */
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
  LogBox.ignoreLogs(['Setting a timer'])

  const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
       <NavigationContainer>       
          <StackNavigation />
        </NavigationContainer>
        <StatusBar style="light" translucent={false}/> 
      </AuthProvider>
    </ThemeProvider>
  )
}

/* Stylesheets in every reative native component to be used in page styling
link here https://reactnative.dev/docs/stylesheet */
