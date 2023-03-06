import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                console.log("Navigate to home!")
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])

    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with: ", user.email);
        })
        .catch(error => alert(error.message));
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value= {email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='Password'
                value= {password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}>
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>

        </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
        width: '100%',
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