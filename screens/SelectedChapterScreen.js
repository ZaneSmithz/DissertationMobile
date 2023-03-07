import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from '../Components/Card'
import { collection, query, doc, where, getDocs, addDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const SelectedChapterScreen = ({ route, navigation }) => {
  const { chapter, chapterInput, chapterId, moduleId, chapterImage } = route.params;
  const [textResponse, setTextResponse] = useState("");
  const [chatId, setChatId] = useState();
  const [uid, setUid] = useState();

  // render photos + videos
  
    useEffect(() => {
        if(auth.currentUser) {
         setUid(auth.currentUser.uid);
        }
        else {
         const unsubscribeAuth = auth.onAuthStateChanged((user) => {
             if(user) {
                 setUid(user.uid);
             }
             else {
                 setUid(null);
             }
         })
         return unsubscribeAuth();
        }
     },[])

  useEffect(() => {
    if(uid) {
        const chatQuery = query(collection(db, 'client_clinican_collection'), where('users', 'array-contains', uid));
        getDocs(chatQuery)
          .then((querySnapshot) => {
              const chatDoc = querySnapshot.docs[0];
              if (chatDoc) {
              const chatId = chatDoc.id;
              setChatId(chatId);
              console.log('Chat ID:', chatId);
              } else {
              console.log('No chat found');
              }
          })
          .catch((error) => {
              console.error('Error getting chat documents:', error);
          });
        console.log("CHAT QUERY ", chatQuery);
    }
}, [uid]);

  const handleSubmit = async () => {
    const messageRef = collection(doc(db, 'client_clinican_collection', chatId), 'chapters');

    try {
      await addDoc(messageRef, {
        textResponse: textResponse,
        chapterId: chapterId,
        chapterCompleted: "true",
        moduleId: moduleId,
      }, {merge: true});
      console.log("Doc updated sucess");
    } catch (error) {
      console.log("Error updating document: ", error);
    }
    // navigate away
    // send prop up saying completed chapter.
  }

  const renderInput = () => (
      <TextInput
          placeholder='Type response...'
                value={textResponse}
                onChangeText={text => setTextResponse(text)}
                style={styles.input}>
      </TextInput>
  );
  const renderButton = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );

    return (
        <View style={styles.container}>
          {chapterImage ? console.log(chapterImage.url) : undefined}
        {chapterImage ? <Image 
              source={{ uri: chapterImage.url}} style={styles.image}  /> : undefined }
            <Card style={styles.cardContent}>
            {chapter.chapterActivity.json.content.map((content) =>
            <Text style={styles.cardContentChapter}>{content.content[0].value}</Text> )}
            </Card>
            {chapterInput == "true" ? renderInput() : undefined}
            {chapterInput == "true" ? renderButton() : undefined}
        </View> 
    )
}

export default SelectedChapterScreen;

const styles = StyleSheet.create({


  image: {
    width: '50%',
    height: '25%',
  },

  container: {
    flex: 1,
    backgroundColor: '#BFD7E3',
    alignItems: 'center',
    height: '100%'
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 15,
    position: 'absolute',
    bottom: 130,
    width: '50%',
    textAlignVertical: 'bottom'
},

    cardContent: {
      flexGrow: 1,
      alignItems: 'center',
      textAlign: 'center',
      marginLeft: 35,
      marginTop: 25,
      color: 'white',
      fontWeight: 'bold',
    },

    cardContentChapter: {
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        color: 'white',
      },

      cardContentChapterTitle: {
        alignItems: 'center',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        color: 'white',
      },

      buttonContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        position: 'absolute',
        bottom: 15,
        height: '20%',
    },

    button: {
        backgroundColor: '#1976d2',
        width: '60%',
        padding: 7,
        marginTop: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
})