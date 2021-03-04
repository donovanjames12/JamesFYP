import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, FlatList, ScrollView } from "react-native"
import {Card, Button} from "react-native-elements"
import { db } from "../firebase.js" 
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons';
import { formatDate } from "../helpers"
import DatePicker from "components/DatePicker"
import { FontAwesome } from '@expo/vector-icons'; 

 /* This form is the exact same layout as RoomList */
function ViewRoomBooking({navigation}) {
    const [roomBookingList, setRoomBookingList] = useState([])
    const [rooms, setRooms] = useState([])
    const [start, setStart] = useState(setStartDate)
    const [end, setEnd] = useState(setEndDate) 

    function setStartDate() {
        let x = new Date()
        x.setHours(0,0,0,0)
        return x
    }

    function setEndDate() {
        let x = new Date()
        x.setHours(23, 59, 59, 999)
        return x
    }

    // code is for the floating button, code obtained here: https://www.npmjs.com/package/react-native-floating-action
    // once floating button is clicked, this is what appears
    const actions = [
        {
          text: "Refresh",
          icon: <AntDesign name="retweet" size={24} color="white" />,
          name: "floatingRefresh",
          position: 1
        },
      ];

    /* Displaying room information from roomBookings collection in firebase
     Temp variable being used to retrieve all elements of roomBookings */
    function getRoomBookings() {
        let rooms = []
        db.collection("rooms").get().then(docs => {
            docs.forEach(doc => {
                let temp = doc.data()
                temp.id = doc.id
                rooms.push(temp)
            })
        })

        db.collection("roomBookings").where("fromDate", ">", start).where("fromDate", "<", end).get()
            .then(docs => {            
                var tempList = []
                docs.forEach(doc => {
                    var temp   

                    temp = doc.data()

                    rooms.forEach(room => {
                        if(room.id == temp.roomId) {
                            temp.roomNo = room.roomNo
                            temp.roomType = room.roomType
                            temp.description = room.roomType
                            temp.price = room.price
                        }
                    })

                    temp.id = doc.id
                    tempList.push(temp)
                 })
                 setRoomBookingList(tempList)
            }).catch(error => {
                console.log(error.message)
            })
    }

  

    // exact same as RoomList, used to fix firestore usage glitch from getRoomBookings.
    // Runs when component is finished rendering. Youtube link on RoomList.
    useEffect(() => {     
        getRoomBookings()
    }, [start, end])

     /* delete room function to removed room item from db and UI, code for this function was acquired here:
    https://firebase.google.com/docs/firestore/manage-data/delete-data*/
    function deleteBooking(id) {
        db.collection("roomBookings").doc(id).delete()
            .then(() => {
                getRoomBookings()
            }).catch(error => {
            })
    }

    /* Item created which will be used to present in Flatlist. JSX in blue is useState variables created in 
    AddRoomBookings.  */
    const Item = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.row}>
                <View style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{item.name}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome 
                        name="trash-o" 
                        size={24} 
                        color="black" 
                        style={{marginLeft: "auto"}} 
                        onPress={() => deleteBooking(item.id)} />
                </View>
            </View>

            <Card.Divider/>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={{fontWeight: "bold"}}>Email</Text>
                    <Text style={{fontWeight: "bold"}}>Address</Text>
                    <Text style={{fontWeight: "bold"}}>Contact No.</Text>
                    <Text style={{fontWeight: "bold"}}>Group Size</Text>
                    <Text style={{fontWeight: "bold"}}>Card No.</Text>
                    <Text style={{fontWeight: "bold"}}>From Date</Text>
                    <Text style={{fontWeight: "bold"}}>To Date</Text>
                </View>
                <View style={styles.column}>
                    <Text>{item.email}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.contactNo}</Text>
                    <Text>{item.groupSize}</Text>
                    <Text>{item.cardNo}</Text>
                    <Text>{formatDate(item.fromDate.toDate())}</Text>
                    <Text>{formatDate(item.toDate.toDate())}</Text>
                </View>
            </View>
        </Card>
    )
// handler to instruct floati ng button actions on what to do when pressed
// NetNinja video using on click handlers https://www.youtube.com/watch?v=PMX6GP1TXGo
    const handleClick = (name) => {
        if(name == "floatingRefresh") {
            getRoomBookings()
        } 
    }


    //NetNinja explains flatlist implementation here: https://www.youtube.com/watch?v=iMCM1NceGJY */

    // data = roomBookingList populated in getRoomBookings function
    // renderItem is the item to be displayed in the flatlist, i.e. the above card item
    // the key extractor is how the item is identified, in this case it is the id of each document retrieved from firestore. 
    // styles are simply how you wish to style the item with the below stylesheet
   
    // floating acion button being called below, link from: https://www.npmjs.com/package/react-native-floating-action
    
    return (
       <> 
            <View style={{display: "flex", flexWrap: "nowrap", flexDirection: "row"}}>
                <DatePicker date={start} setDate={setStart} style={{flexGrow: 1}}/>
                <DatePicker date={end} setDate={setEnd} style={{flexGrow: 1}}/>
            </View>
            
            <FlatList
                data={roomBookingList}
                renderItem={Item}
                keyExtractor={item => item.id}
                style={styles.list}
            />

            <FloatingAction 
                actions={actions}
                onPressItem={name => handleClick(name) }
            />
        
            </>
            
    )
}


const styles = StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingBottom: 8
    },
    column: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1
    }
})

export default ViewRoomBooking