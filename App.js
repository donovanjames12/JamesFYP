import { StatusBar } from 'expo-status-bar'
import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ThemeProvider, Button, } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import {auth} from "./firebase"
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';

/* Importing components into App to be used in main application*/
import HomePage from './components/HomePage';
import RoomList from './components/RoomList';
import AddRoom from './components/AddRoom';

import AddRoomBooking from './components/AddRoomBooking';
import ViewRoomBookings from './components/ViewRoomBookings';
import BookingConfirmation from "./components/BookingConfirmation"
import Login from "./components/Login"
import Registration from "./components/Registration"

/* Creating a theme which can be usedd application-wide linke at https://reactnativeelements.com/docs/customization/  */
const theme = {
  Button: {
    
  },
}

/* Declaring drawer navigator method*/
/*Drawer navigation code https://reactnavigation.org/docs/drawer-based-navigation/ */
/* stack navigator documenatation https://reactnavigation.org/docs/stack-navigator */
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator()

 /* navigation property passed down from stack navigator i.e. 'navigation.goBack' 
 used across application and obtained from https://reactnavigation.org/docs/navigation-prop  */

/* signout code got from https://firebase.google.com/docs/auth/web/password-auth */
 function DrawerNavigation({navigation}) {
  function signOut() {
    auth.signOut()
    navigation.navigate("Login")
  }

   /* drawer navigation code and explanation https://reactnavigation.org/docs/drawer-navigator  */
  
   /* menu providor code here https://www.npmjs.com/package/react-native-popup-menu 
  */ 
  
  
   return (
    <MenuProvider>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{
          headerShown:true, 
          headerRight: () => 
            <Menu>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" size={24} color="black" />
              </MenuTrigger> 
              <MenuOptions>
                <MenuOption onSelect={() => signOut()} text='Log Out' />
              </MenuOptions>
            </Menu>
        }}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="View Our Rooms" component={RoomList} />
        <Drawer.Screen name="View Room Bookings" component={ViewRoomBookings} />
      </Drawer.Navigator>
    </MenuProvider>

   
  )
}


/* The drawer inputs placed wihin a themeprovidor 
which ensures it is used across all components mentioned within return statement*/
 /*rootstack.navigator passes navigation prop to every screen (i.e. screens that can access navigation)*/
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        
        <RootStack.Navigator mode="modal" initialRouteName="Login" options={{cardStyle:{flex: 1}}}>
          <RootStack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigation} />
          <RootStack.Screen name="Add Room" component={AddRoom} />
          <RootStack.Screen name="Add Room Booking" component={AddRoomBooking} />
        
          <RootStack.Screen name="Booking Confirmation" options={{ headerShown: false }} component={BookingConfirmation} />
          <RootStack.Screen name="Login"  options={{ headerShown: false }} component={Login} />
          <RootStack.Screen name="Registration"  options={{ headerShown: false }} component={Registration} />
        </RootStack.Navigator>     
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
