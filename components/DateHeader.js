import React from 'react'
import { Text, View } from 'react-native'
import {purple} from "../utils/colors";

export default function DateHeader ({ date }) {
    return (
        <View>
            <Text style={{color: purple, fontSize:25}}>
                {date}
            </Text>
        </View>
    )
}
