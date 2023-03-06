import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import Card from './Card'

const HomeCard = ({item}) => {
    console.log(item.moduleChapters.links.entries.block[0]);
    const navigation = useNavigation()

    return (
      <View style={styles.cardContainer}>
        <Card>
          <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate({ 
            name: "ChapterScreen",
            params: {item: item},
            })}>
            <Text style={styles.cardContent}>{item.moduleTitle}</Text>
            </TouchableOpacity>
        </Card>
        </View>
    )
}

export default HomeCard;

const styles = StyleSheet.create({
    cardContent: {
      color: 'white',
      minHeight: 28,
      marginTop: 14,

    },

    navigateButton: {
      marginLeft: 45,
    },

    cardContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
})