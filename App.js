import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ThemeProvider, Button, } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

/* Importing components into App to be used in main application*/
import HomePage from './components/HomePage';
import RoomList from './components/RoomList';
import AddRoom from './components/AddRoom';
import Room from './components/Room';
import AddRoomBooking from './components/AddRoomBooking';
import ViewRoomBookings from './components/ViewRoomBookings';
import BookingConfirmation from "./components/BookingConfirmation"

/* Creating a theme which can be usedd application-wide */
const theme = {
  Button: {
    
  },
}

function Modal({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

/* Declaring drawer navigator method*/
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator()


function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="View Our Rooms" screenOptions={{headerShown:true}}>
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="View Our Rooms" component={RoomList} />
      <Drawer.Screen name="View Room Bookings" component={ViewRoomBookings} />
    </Drawer.Navigator>
  )
}

/* const Stack = createStackNavigator();
 */
/* The drawer inputs placed wihin a themeprovidor 
which ensures it is used across all components mentioned within return statement*/
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer >
        <RootStack.Navigator mode="modal" options={{cardStyle:{flex: 1}}}>
          <RootStack.Screen name="Main" options={{ headerShown: false }}  component={DrawerNavigation} />
          <RootStack.Screen name="Add Room" component={AddRoom} />
          <RootStack.Screen name="Add Room Booking" component={AddRoomBooking} />
          <RootStack.Screen name="Room" component={Room} />
          <RootStack.Screen name="Booking Confirmation" options={{ headerShown: false }} component={BookingConfirmation} />
        </RootStack.Navigator>     
      </NavigationContainer>
    </ThemeProvider>
  )
}

/* Stylesheets in every reative native component to be used in page styling*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
