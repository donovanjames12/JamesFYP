import React, { useEffect } from "react"
import { createStackNavigator } from '@react-navigation/stack';

/* Importing components into App to be used in main application*/
import RoomList from '../screens/RoomList';
import AddRoom from '../screens/AddRoom';
import AddRoomBooking from '../screens/AddRoomBooking';
import ViewRoomBookings from '../screens/ViewRoomBookings';
import BookingConfirmation from "../screens/BookingConfirmation"
import Login from "../screens/Login"
import Registration from "../screens/Registration"
import DrawerNavigation from "./DrawerNavigation"

import { useAuth } from "components/AuthContext"

// stack navigator documenatation https://reactnavigation.org/docs/stack-navigator 

const RootStack = createStackNavigator()

function StackNavigation() {
    const { userType } = useAuth()

    return(
        <RootStack.Navigator mode="modal" options={{cardStyle:{flex: 1}}}>
            {
                userType == null ? 
                    <>
                        <RootStack.Screen name="Login"  options={{ headerShown: false }} component={Login} />
                        <RootStack.Screen name="Registration"  options={{ headerShown: false }} component={Registration} />
                    </>
                :
                    <>
                        <RootStack.Screen name="Main" options={{ headerShown: false }} component={DrawerNavigation} />
                        <RootStack.Screen name="Add Room Booking" component={AddRoomBooking} />    
                        <RootStack.Screen name="Booking Confirmation" options={{ headerShown: false }} component={BookingConfirmation} />
                        {userType == "admin" && <RootStack.Screen name="Add Room" component={AddRoom} />}
                    </>     
            } 
        </RootStack.Navigator>  
    )
}
   
export default StackNavigation