import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'

const Chapters = ({ route, navigation }) => {
  const { item } = route.params;
  const [moduleId, setModuleId] = useState("");

  useEffect(() => {
    setModuleId(item.moduleId);
  }, [])

    return (
        <View style={styles.container}>
            {item.moduleChapters.links.entries.block.map((chapter) => 
             <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate({ 
              name: "SelectedChapterScreen",
              params: {chapter: chapter, chapterInput: chapter.userInput, chapterId: chapter.chapterId, moduleId: moduleId, chapterImage: chapter.chapterImage},
              })}>
            <Card>
              <Text style={styles.cardContentChapterTitle}> {chapter.chapterTitle} </Text>
            </Card>
            </TouchableOpacity>
            )}
        </View>
    )
}

export default Chapters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFD7E3',
    alignItems: 'center',
  },

  navigateButton: {
    width: '100%',
    alignItems: 'center'

  },

    cardContent: {
      alignItems: 'center',
      marginLeft: 35,
      marginTop: 25,
      color: 'white',
      fontWeight: 'bold',
    },

    cardContentChapter: {
        alignItems: 'center',
        marginLeft: 35,
        color: 'white',
      },

      cardContentChapterTitle: {
        alignItems: 'center',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
      },
})