import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ title ,onPress,...props}) => {
    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={onPress} {...props} >
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 10,
        backgroundColor: "green",
        borderRadius: 5
    },
    btnText: {
        textAlign: "center",
        color: "#fff"
    }
})