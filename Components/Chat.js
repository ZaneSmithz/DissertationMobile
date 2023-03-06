import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase';
import {collection, addDoc, query, orderBy, onSnapshot, doc, where, getDocs, serverTimestamp} from 'firebase/firestore'
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Chat = () => {

    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState();
    const [profile, setProfile] = useState();
    const [uid, setUid] = useState();

    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }

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
            const chatQuery = query(collection(db, 'chats'), where('users', 'array-contains', uid));
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


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return(
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <Text>LOGOUT</Text>
                    <Ionicons name="log-out-outline" color={'black'} size={24}/>
                </TouchableOpacity>
            )}
        })

        if(chatId) {
            const messageRef = collection(doc(db, 'chats', chatId), 'messages');
            const q  = query(messageRef, orderBy('createdAt', 'desc'));

            const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            ));
    return () => {
        unsubscribe();
}
} else return () => {}}, [chatId]);

    const onSend = useCallback((messages = []) => {
        const { _id, createdAt, text, user,} = messages[0]
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        if(chatId) {
        const messageRef = collection(doc(db, 'chats', chatId), 'messages');

        addDoc(messageRef, {
            _id,
            createdAt,
            text,
            user,
        }).then((docRef) => {
            console.log('Messaged added ' + docRef);
        });
    }
    }, [chatId]);

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
        />
    );
}

export default Chat;