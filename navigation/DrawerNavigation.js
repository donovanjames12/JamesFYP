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
import { auth } from "../firebase"
import AddTableBooking from "../screens/AddTableBooking";
import ViewTableBookings from "../screens/ViewTableBookings"
import { useAuth } from "components/AuthContext"
import Takeaway from "screens/Takeaway"
import ViewOrders from "screens/ViewOrders"

/* Declaring drawer navigator*/
/*Drawer navigation code https://reactnavigation.org/docs/drawer-based-navigation/ */

const Drawer = createDrawerNavigator();


function DrawerNavigation() {  
  const { userType } = useAuth()

  /* menu providor code here https://www.npmjs.com/package/react-native-popup-menu */   
  /* signout code got from https://rnfirebase.io/auth/usage */
   // Menu provider button added to right side of drawer header, signout function called when button is selected
   // Code for icons on header obtained here: https://icons.expo.fyi/
     return (
      <MenuProvider>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{
            headerShown:true, 
            headerRight: () => // menu provider being used on right side of drawer hader
              <Menu>
                <MenuTrigger> 
                  <Entypo name="dots-three-vertical" size={24} color="blue" /> 
                </MenuTrigger> 
                <MenuOptions>
                  <MenuOption style={{padding: 15}} onSelect={() => auth.signOut().catch(error => alert(error.message))} text='Log Out' /> 
                </MenuOptions> 
              </Menu>
          }}>
          <Drawer.Screen name="Home" component={HomePage} />
          <Drawer.Screen name="View Our Rooms" component={RoomList} />
          <Drawer.Screen name="Book A Table" component={AddTableBooking} />
          <Drawer.Screen name="Takeaway List" component={Takeaway} />
          { 
            userType == "admin" && // if user type is admin then they can see the additional screens with regard to bookings made
            <>          
              <Drawer.Screen name="View Room Bookings" component={ViewRoomBookings} />
              <Drawer.Screen name="View Table Bookings" component={ViewTableBookings} />
              <Drawer.Screen name="View Takeaway Orders" component={ViewOrders} />
            </>
          }
        </Drawer.Navigator>    
      </MenuProvider>  
    )
  }

  export default DrawerNavigation