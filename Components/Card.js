import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const Card = (props) => {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
      width: '75%',
      borderRadius: 10,
      backgroundColor:'#7E9BA9',
      marginBottom: 15,
      marginTop: 20,
    },
})