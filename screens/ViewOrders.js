import React, {useState, useEffect} from "react"
import { ScrollView, FlatList, View, StyleSheet } from "react-native"
import { ListItem, Avatar, Text, Card } from "react-native-elements"
import { db } from "../firebase"
import { FloatingAction } from "react-native-floating-action";
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'; 

function ViewOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadOrders()
    }, [])

    async function loadOrders() {
        let docs = await db.collection("orders").get()

        let orderList = []
        docs.forEach(doc => {
            let temp = doc.data()
            temp.id = doc.id
            orderList.push(temp)
        })

        setOrders(orderList)
        console.log(orders)
    }

    function deleteOrder(id) {
        db.collection("orders").doc(id).delete()
            .then(() => {
                loadOrders()
            })
    }

    const item = ({item}) => (
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
                        style={{marginLeft: "auto"}} 
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

            {
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