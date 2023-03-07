import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import {doc, collection, where, setDoc, getDocs, getDoc, query} from 'firebase/firestore'
import Card from '../Components/Card'

const Chapters = ({ route, navigation }) => {
  const { item } = route.params;
  const [moduleId, setModuleId] = useState("");
  const [chatId, setChatId] = useState();
  const [uid, setUid] = useState();
  const [chapterIdCompleted, setChapterIdCompleted] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setModuleId(item.moduleId);
  }, [])

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

// if chatId -> messages -> map 

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
  }
}, [uid]);

useEffect(() => {
  if(chatId) {
    const docRef = query(collection(db, 'client_clinican_collection', chatId, 'chapters'), where('chapterCompleted', '==', 'true'));
    getDocs(docRef)
        .then((querySnapshot) => {
            const chatDocs = querySnapshot.docs;
            if (chatDocs) {
            const completedChapterId = chatDocs.map((chapterIds) => {return chapterIds.id});
            console.log("COMPLETED CHAPTER ID ARRAY? ", completedChapterId)
            setChapterIdCompleted(completedChapterId);
            } else {
            console.log('NESTED COLLECTION! No chat found');
            }
        })
        .catch((error) => {
            console.error('NESTED COLLECTION! Error getting chat documents:', error);
        });
  }
}, [chatId])

const handlePress = (chapter) => {
  const messageRef = collection(db, 'client_clinican_collection');

    try {
       setDoc(doc(messageRef, chatId), {
        currentChapter: chapter.chapterId,
        currentModule: moduleId,

       }, {merge: true});
      console.log("Doc updated sucess");
    } catch (error) {
      console.log("Error updating document: ", error);
    }
    // navigate away
    // send prop up saying completed chapter

  navigation.navigate({ 
    name: "SelectedChapterScreen",
    params: {chapter: chapter, chapterInput: chapter.userInput,
       chapterId: chapter.chapterId, moduleId: moduleId,
        chapterImage: chapter.chapterImage},
    })
  }

  useEffect (() => { 
    if(chatId) {
    const chapterRef = collection(db, 'client_clinican_collection', chatId, 'chapters');
    const myQuery = query(chapterRef, where('chapterCompleted', '==', 'true'))

      getDocs(myQuery).then((querySnapshot) => {
        setDocuments(querySnapshot.docs.map((doc) => ( {
          id: doc.id,
          chapterIdDoc: doc.data().chapterId,
          moduleIdDoc: doc.data().moduleId,
          chapterCompletedDoc: doc.data().chapterCompleted,
        })))
      }).catch((error) => {
        console.error('error getting doc', error);
      })
    }
  }, [chatId]);

  const isDisabled2 = (chapter) => {
 
    if(documents) {
      for(let i=0; i<documents.length; i++) {
        console.log(documents[i].chapterCompletedDoc)
        console.log(documents[i].chapterIdDoc)
        if(documents[i].chapterCompletedDoc == 'true' && documents[i].chapterIdDoc == chapter.chapterId && documents[i].moduleIdDoc == moduleId) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <View style={styles.container}>
      {item.moduleChapters.links.entries.block.map((chapter) => (
        isDisabled2(chapter) ? (
          <TouchableOpacity style={styles.navigateButton} disabled={true} onPress={() => handlePress(chapter)}>
            <Card>
              <Text style={styles.cardContentChapterTitleDisabled}> {chapter.chapterTitle} </Text>
            </Card>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navigateButton} disabled={false} onPress={() => handlePress(chapter)}>
            <Card>
              <Text style={styles.cardContentChapterTitle}> {chapter.chapterTitle} </Text>
            </Card>
          </TouchableOpacity>
        )
      ))}
    </View>
  );
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

  colour: {
    backgroundColor: '#323639',
    color: '#323639',
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

      cardContentChapterTitleDisabled: {
        alignItems: 'center',
        marginLeft: 30,
        marginTop: 10,
        marginBottom: 10,
        color: '#323639',
      },
})