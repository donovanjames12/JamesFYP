import React, { useState } from "react"
import { TouchableNativeFeedback, View } from "react-native"
import { Text, Button, Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate } from "../helpers"

function DatePicker({date, setDate, style}) {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    return (
        <View style={style}>
            <Button title={formatDate(date)} onPress={() => {setShow(true)}} containerStyle={{marginRight: 15, marginLeft: 15, marginTop: 15}}/> 
            {show &&
                <DateTimePicker // date time picker code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
                    value={date}
                    mode={"date"}
                    display="default"
                    style={{width: "100%", marginBottom: 15, marginLeft: 8}}
                    onChange={onChange}
                />
            }     
        </View>    
    )
}

export default DatePicker