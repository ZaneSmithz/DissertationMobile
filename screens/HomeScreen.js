import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { gql, useQuery } from '@apollo/client';
import HomeCard from '../Components/HomeCard';

const query = gql`
{
  moduleCollection(limit: 10){
    items{
      moduleTitle
      moduleId
      moduleChapters{
        links{
          entries{
            block {
              __typename
              ...on Chapter {
                chapterId
                chapterImage{
                  title
              		contentType
                  url
                }
                userInput
                chapterTitle
                chapterActivity{
                  json
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const HomeScreen = () => {
  let { data, errors } =  useQuery(query);


  if(!data) {
    return <Text> Loading... </Text>
  } 

  const { moduleCollection } = data;

  console.log(moduleCollection.items[0])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
          {moduleCollection.items.map((item) => 
            <HomeCard item={item}/>
          )}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',

  },

  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    backgroundColor: '#BFD7E3',
    flexGrow: 1,
    width: '100%'
  },
})