import React, {useState, useEffect} from "react"
import { ScrollView, FlatList, View, StyleSheet } from "react-native"
import { ListItem, Avatar, Text, Card } from "react-native-elements"
import { db } from "../firebase"
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 

function ViewOrders() {
    const [orders, setOrders] = useState([])

    // useeffect to ensure orders loaded once when page renders and not consistently spage is open
    useEffect(() => {
        loadOrders()
    }, [])

    // all orders being loaded from the orders collection
    async function loadOrders() {
        let docs = await db.collection("orders").get()

        let orderList = [] // empty array
        docs.forEach(doc => {
            let temp = doc.data() // temp variable made equal to document data
            temp.id = doc.id // id retrieved by setting temp = to document id
            orderList.push(temp) // temp variable (with id) pushed onto empty array
        })

        setOrders(orderList) // array made = to above usestate
        console.log(orders)
    }

     // deleting a document here: https://firebase.google.com/docs/firestore/manage-data/delete-data
    function deleteOrder(id) {
        db.collection("orders").doc(id).delete()
            .then(() => {
                loadOrders()
            })
    }

    const item = ({item}) => ( // item for displaying order data in flatlist, used throughout project, used by NetNinja on Youtube
        <Card key={item.id}> 
            <View style={styles.row}> 
                <View style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>Order Details</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome 
                        name="trash-o" 
                        size={24} 
                        color="black" 
                        style={{marginLeft: "auto"}}  // delete order function called below
                        onPress={() => deleteOrder(item.id)} /> 
                </View>
            </View>
            <View style={{flexDirection: "row", paddingLeft: 10, paddingRight: 10, marginBottom: 25}}>
                <View style={{flexDirection: "column", flexGrow: 1}}>
                    <Text style={{fontWeight:"bold"}}>Name</Text>
                    <Text style={{fontWeight:"bold"}}>Phone</Text>
                </View>
                <View style={{flexDirection: "column", flexGrow: 1}}>
                    <Text>{item.name}</Text>
                    <Text>{item.phoneNum}</Text>
                </View>
            </View>

            { // menu item images being displayed in order
                item.items.map(item => (
                    <>
                        <ListItem>
                            <Avatar source={{uri: `https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/menu%2F${item.id}?alt=media&token=9eb07b90-e91e-43ba-9def-966c563b6b82`}} />
                            <Text>{item.title} x{item.amount}</Text>
                        </ListItem>
                    </>
                ))
            }
        </Card>
    )
 // code again, for the use action button, link in roomlist
    const actions = [
        {
            text: "Refresh",
            icon: <AntDesign name="retweet" size={24} color="white" />,
            name: "floatingRefresh",
            position: 1
        }, 
    ]

    const handleClick = (name) => {
        if (name == "floatingRefresh") {
            loadOrders()
        }
    }

    // takeaway orders being displayed ina flatlist
    return (
        <>
            <ScrollView>
                <FlatList
                    data={orders}
                    renderItem={item}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
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


export default ViewOrders