import React, { useState } from "react"
import { TouchableNativeFeedback, View } from "react-native"
import { Text, Button, Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'
import { formatDate } from "../helpers"
 // I use the Date Picker often for carrying out and displaying bookings
 // due to frequency of use, I made it into a reusable component 
function DatePicker({date, setDate, style}) {
    const [show, setShow] = useState(false);

    // code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
    // as I am testing on iOS, i left the mode feature out (prevents calendar immediately dislaying on android)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    // code also acquired from the above link 
    return (
        <View style={style}>
            <DateTimePicker 
                value={date}
                mode={"date"}
                display="default"
                style={{width: "100%"}}
                onChange={onChange}
            />
        </View>    
    )
}

export default DatePicker