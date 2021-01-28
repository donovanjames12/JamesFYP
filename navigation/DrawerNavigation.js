import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    MenuProvider
  } from 'react-native-popup-menu';

import HomePage from "../screens/HomePage"
import RoomList from "../screens/RoomList"
import ViewRoomBookings from "../screens/ViewRoomBookings"
import { Entypo } from '@expo/vector-icons';
import {auth} from "../firebase"

/* Declaring drawer navigator method*/
/*Drawer navigation code https://reactnavigation.org/docs/drawer-based-navigation/ */

const Drawer = createDrawerNavigator();
/* signout code got from https://rnfirebase.io/auth/usage */
function DrawerNavigation({navigation}) {
    
  function signOut() {
      auth.signOut()
      navigation.navigate("Login")
    }
  
     /* drawer navigation code and explanation https://reactnavigation.org/docs/drawer-navigator  */
     /* menu providor code here https://www.npmjs.com/package/react-native-popup-menu */ 
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
                  <MenuOption style={{padding: 15}} onSelect={() => signOut()} text='Log Out' />
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

  export default DrawerNavigation