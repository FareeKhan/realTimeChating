import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder,value,onChangeText,...props}) => {
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                style={styles.inputStyle}
                value={value}
                onChangeText={onChangeText}
                {...props}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderColor: "green",
        borderRadius: 5,
        marginBottom: 20,
        paddingLeft:10,
        height:42
      }
})