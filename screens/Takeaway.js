import React, { useState, useEffect } from "react"
import { FlatList, StyleSheet, View, ScrollView } from "react-native"
import { Card, Text, Button, Input, Divider, ListItem, Avatar } from "react-native-elements"
import { FloatingAction } from "react-native-floating-action"
import { db } from "../firebase"
import { useAuth } from "components/AuthContext"
import { FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'; 

function Takeaway({navigation}) {
    const [menuItems, setMenuItems] = useState([])
    const [order, setOrder] = useState([])
    const [update, setUpdate] = useState(0)

    const [name, setName] = useState("")
    const [phoneNum, setPhoneNum] = useState("")
    const { userType } = useAuth()

    let actions = []

    if(userType == "admin") { // again, conditional rendering to hide add room option unless an admin
        actions = [
            {
                text: "Refresh",
                icon: <AntDesign name="retweet" size={24} color="white" />,
                name: "floatingRefresh",
                position: 1
            }, 
            {
                text: "Add Menu Item",
                icon: <FontAwesome5 name="hamburger" size={24} color="white" />,
                name: "floatingAdd",
                position: 2
            }
        ]
    } else {
        actions = [
            {
                text: "Refresh",
                icon: <AntDesign name="retweet" size={24} color="white" />,
                name: "floatingRefresh",
                position: 1
            }, 
        ]
    }

    useEffect(() => {
        getMenu()
    }, [])

    async function getMenu() {
        let docs = await db.collection("menu").get().catch(error => alert(error.message))

        let menuList = []
        docs.forEach(doc => {
            let item = doc.data()
            item.id = doc.id
            menuList.push(item)
        })
        setMenuItems(menuList)
    }

    function deleteTakeawayItem(id) {
        db.collection("menu").doc(id).delete()
            .then(() => {
                getMenu()
            }).catch(error => alert(error.message))
    }

    function addToOrder(newItem) {
        let orderList = order

        let found = false
        
        orderList.forEach(item => {
            if(item.id == newItem.id){
                    found = true
                    item.amount++
                } 
        })

        if(found == false) {
            newItem.amount = 1
            orderList.push(newItem)
        }
        
        setUpdate(prev => prev + 1)
        setOrder(orderList)
    }

    function removeFromOrder(index) {
        let orderList = order

        orderList[index].amount--

        if(orderList[index].amount < 1) {
            orderList.splice(index, 1);
        }

        setOrder(orderList)
        setUpdate(prev => prev + 1)
    }

    function submitOrder() {
        console.log(order)

        db.collection("orders")
            .add({ 
                name: name,
                phoneNum: phoneNum,
                items: order
            })
            .then(() => alert("Order Submitted"))
            .catch(error => alert(error.message))  
    }

    const item = ({item}) => (
        <Card>  
            { 
                userType == "admin" // conditional rendering so admin can only deletea room from the UI
                ? 
                <View style={styles.row}>
                    <View style={{display: "flex", flexDirection: "column", flexGrow: 1}}>
                        <Text>{item.title}</Text>
                    </View>
                    <View style={styles.column}>
                        <FontAwesome 
                            name="trash-o" 
                            size={24} 
                            color="black" 
                            style={{marginLeft: "auto"}} 
                            onPress={() => deleteTakeawayItem(item.id)} 
                        />
                    </View>
                </View>
                :
                <Card.Title>
                    <Text>{item.title}</Text>
                </Card.Title>
            }
             
            <Card.Divider/>
            <Card.Title>  
                <Text>€{item.price}</Text>
            </Card.Title>
            <Card.Title>
                <Text>{item.description}</Text>
            </Card.Title> 
            <Card.Image source={{uri: `https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/menu%2F${item.id}?alt=media&token=9eb07b90-e91e-43ba-9def-966c563b6b82`}} /> 
            <Button title="Add Item" buttonStyle={styles.button} onPress={() => addToOrder(item)}/>
        </Card>
    )

    const orderItem = ({item, index}) => (
        <ListItem key={item.id}>
            <Avatar source={{uri: `https://firebasestorage.googleapis.com/v0/b/fypjames-a754f.appspot.com/o/menu%2F${item.id}?alt=media&token=9eb07b90-e91e-43ba-9def-966c563b6b82`}} />
            <Text>{item.title}</Text>
            <Text>€{item.price}</Text>
            <Text style={{marginLeft: "auto"}}>x{item.amount}</Text>
            <FontAwesome 
                name="trash-o" 
                size={24} 
                color="black" 
                style={{marginLeft: "auto"}} 
                onPress={() => removeFromOrder(index)} 
            />
        </ListItem>
    )

    function handleClick(name) {
        if(name == "floatingRefresh") {
            getMenu()
        } else if(name == "floatingAdd") {
            navigation.navigate("Add Menu Item")
        }
    }

    return (
        <>
            <ScrollView >
                <Card>
                    <Text>Order for collection. Pay on collection.</Text>
                </Card> 
                <Card>
                    <Card.Title>Your Order</Card.Title>
                    <Divider />
                    <FlatList
                        data={order}
                        extraData={update}
                        renderItem={orderItem}
                        keyExtractor={item => item.id}
                        style={styles.list}
                    />
                </Card>
                <FlatList
                    data={menuItems}
                    renderItem={item}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
                <Card>
                    <Input 
                        label="Name"
                        onChangeText={text => setName(text)}  
                        value={name} 
                    />
                    <Input 
                        label="Phone Number"
                        onChangeText={text => setPhoneNum(text)}  
                        value={phoneNum} 
                    />
                    <Button title="Submit Order" onPress={submitOrder}/>
                </Card>        
            </ScrollView>
                
            <FloatingAction 
                actions={actions}
                onPressItem={name => handleClick(name) }
            />
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        flex: 1,
        flexGrow: 1,
        width: "100%"
    },
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

export default Takeaway