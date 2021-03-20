import React, {useState, useEffect} from 'react'
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Card, Image, Text, Button, Icon, Divider } from "react-native-elements"
import {db, auth} from "../firebase"
import { useAuth } from "components/AuthContext"
import DatePicker from "components/DatePicker"

 /* HomePage used in navigation bar */
function HomePage({navigation}) {
    const { userType } = useAuth()
    const [date, setDate] = useState(new Date())
    const [rooms, setRooms] = useState([])
    const [timeslot1, setTimeslot1] = useState(100)
    const [timeslot2, setTimeslot2] = useState(100)
    const [timeslot3, setTimeslot3] = useState(100)
    const [timeslot4, setTimeslot4] = useState(100)
    const [timeslot5, setTimeslot5] = useState(100)
    /* SafeAreaView used due to screen components extending beyond the physical
     remits of the phone screen, code acquired here: https://reactnative.dev/docs/safeareaview */

     /* TouchableOpacity adds onPress ability to components,
      code for usage acquired here from NetNinja via youtube: https://www.youtube.com/watch?v=QhX25YGf8qg&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=8*/

          // getting start and end of day code https://stackoverflow.com/questions/8636617/how-to-get-start-and-end-of-day-in-javascript/8636674
    // function to set date picker start date at midnight

    useEffect(() => {
        handleDate(new Date())
    }, [])
    
    function handleDate(date) {
        setDate(date)
        
        const fromDate = new Date(date.setHours(0,0,0,0))
        const toDate = new Date(date.setHours(23, 59, 59))

        getRoomBookings(fromDate, toDate)
        getTableBookings(fromDate, toDate)
    }

    async function getRoomBookings(fromDate, toDate) {
        let roomBookingDocs = await db.collection("roomBookings").where("fromDate", ">", fromDate).where("fromDate", "<", toDate).get().catch(error => alert(error.message))
        let roomIds = []

        roomBookingDocs.forEach(doc => {
            if(!roomIds.includes(doc.data().roomId)) {
                roomIds.push(doc.data().roomId)
            }
        })

        let roomsDocs = await db.collection("rooms").get()
        let rooms = []

        roomsDocs.forEach(doc => {
            let room = doc.data()
            room.id = doc.id
            room.available = !roomIds.includes(room.id)
            rooms.push(room)
        })
        
        setRooms(rooms)
    }

    async function getTableBookings(fromDate, toDate) {
        setTimeslot1(100)
        setTimeslot2(100)
        setTimeslot3(100)
        setTimeslot4(100)
        setTimeslot5(100)

        let docs = await db.collection("tableBookings").where("date", ">", fromDate).where("date", "<", toDate).get().catch(error => alert(error.message))
        let tableBookings = []

        docs.forEach(doc => {
            let temp = doc.data()
            temp.id = doc.id
            tableBookings.push(temp)
        })
        
        tableBookings.forEach(booking => {
            if(booking.timeslot == "17:00 - 18:00") {
                setTimeslot1(previousValue => (previousValue - parseInt(booking.groupSize)))
            } else if(booking.timeslot == "18:00 - 19:00") {
                setTimeslot2(previousValue => (previousValue - parseInt(booking.groupSize)))
            } else if(booking.timeslot == "19:00 - 20:00") {
                setTimeslot3(previousValue => (previousValue - parseInt(booking.groupSize)))
            } else if(booking.timeslot == "20:00 - 21:00") {
                setTimeslot4(previousValue => (previousValue - parseInt(booking.groupSize)))
            } else if(booking.timeslot == "21:00 - 22:00") {
                setTimeslot5(previousValue => (previousValue - parseInt(booking.groupSize)))
            }
        })
    }

    const listItem = ({ item }) => (
        <View style={{flexDirection: "row"}}>
            <View style={{padding: 5}}>
                <Text style={{fontWeight: "bold"}}>Room No</Text>
                <Text style={{fontWeight: "bold"}}>Room Type</Text>
                <Text style={{fontWeight: "bold"}}>Available</Text>
            </View>
            <View style={{padding: 5, marginLeft: 25}}>
                <Text>{item.roomNo}</Text>
                <Text>{item.roomType}</Text>
                <Text>{item.available ? "Yes" : "No"}</Text>
            </View>
            <Divider />
        </View>
    )

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <DatePicker date={date} setDate={handleDate}/> 
                <Card>
                    <Card.Title>Room Availability</Card.Title>
                    <FlatList
                        data={rooms}
                        renderItem={listItem}
                        keyExtractor={item => item.id}
                        style={styles.list}
                    />
                </Card>
                <Card>
                    <Card.Title>Table Availability</Card.Title>
                    <View style={{flexDirection: "row"}}>
                        <View style={{padding: 5}}>
                            <Text style={{fontWeight: "bold"}}>17:00 - 18:00</Text>
                            <Text style={{fontWeight: "bold"}}>18:00 - 19:00</Text>
                            <Text style={{fontWeight: "bold"}}>19:00 - 20:00</Text>
                            <Text style={{fontWeight: "bold"}}>20:00 - 21:00</Text>
                            <Text style={{fontWeight: "bold"}}>21:00 - 22:00</Text>
                        </View>
                        <View style={{padding: 5, marginLeft: 25}}>
                            <Text>Remaining Seats: {timeslot1}</Text>
                            <Text>Remaining Seats: {timeslot2}</Text>
                            <Text>Remaining Seats: {timeslot3}</Text>
                            <Text>Remaining Seats: {timeslot4}</Text>
                            <Text>Remaining Seats: {timeslot5}</Text>
                        </View>
                    </View>
                </Card>
                <TouchableOpacity onPress={() => navigation.navigate("View Our Rooms")}>
                    <Card style={styles.card}>
                        <Card.Title>Book Room</Card.Title>
                        <Card.Image source={{uri: "https://insights.ehotelier.com/wp-content/uploads/sites/6/2020/01/hotel-room-300x300.jpg"}}>          
                        </Card.Image>
                        <Text h5 style={styles.text}>Take a look at our rooms here!</Text>
                    </Card>   
                </TouchableOpacity> 
                { 
                    userType == "admin" && // conditional rendering to display correct menu items to each user
                    <TouchableOpacity onPress={() => navigation.navigate("View Room Bookings")}>
                        <Card style={styles.card}>
                            <Card.Title>Current Room Bookings.</Card.Title>
                            <Card.Image source={{uri: "data:image/png;base64,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"}}>          
                            </Card.Image>
                            <Text h5 style={styles.text}>See Room Bookings.</Text>
                        </Card>   
                    </TouchableOpacity> 
                }
        
                <TouchableOpacity onPress={() => navigation.navigate("Book A Table")}>
                    <Card style={styles.card}>
                        <Card.Title>Table Booking Here.</Card.Title>
                        <Card.Image source={{uri: "https://www.coppingerrow.com/wordpress/wp-content/uploads/2019/02/booking-bk.jpg"}}>          
                        </Card.Image>
                        <Text h5 style={styles.text}>Book a table here!</Text>
                    </Card>   
                </TouchableOpacity>
                { 
                    userType == "admin" && 
                    <TouchableOpacity onPress={() => navigation.navigate("View Table Bookings")}>
                        <Card style={styles.card}>
                            <Card.Title>Table Booking List Here.</Card.Title>
                            <Card.Image source={{uri: "data:image/jpeg;base64,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"}}>          
                            </Card.Image>
                            <Text h5 style={styles.text}>See who booked a table here!</Text>
                        </Card>   
                    </TouchableOpacity> 
                }
            </SafeAreaView>
        </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    text: {      
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: "center"
    },
    card: {
        textAlign: "center"
    },
    image: {

    },
    container: {
        backgroundColor: '#fff',
        width: "100%",
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto"
    },
});

export default HomePage;