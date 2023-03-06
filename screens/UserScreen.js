import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'

const UserScreen = () => {
    const navigation = useNavigation()
    
    const handleSubmit = async () => {
        signOut(auth)
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#BFD7E3',
    },
    
    inputContainer: {
        width: '80%',
    },
  
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
  
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
  
    button: {
        backgroundColor: '#1976d2',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
  
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
  })