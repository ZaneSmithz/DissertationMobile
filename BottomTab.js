import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/HomeScreen';
import UserScreen from './screens/UserScreen';
import ChapterScreen from './screens/ChapterScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Chat from './Components/Chat';

const Tab = createBottomTabNavigator();

const BottomTab = () => {

  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#FFFFFF'},
        tabBarInactiveTintColor: '#00000',
        tabBarActiveTintColor: 'blue',
    }}>
        <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
            )
        }} />
         <Tab.Screen name='UserScreen' component={UserScreen} options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="person-outline" color={color} size={size} />
            )
        }} />
        <Tab.Screen name='Chat' component={Chat} options={{
            tabBarIcon: ({color, size}) => (
                <Ionicons name="chatbubbles-outline" color={color} size={size} />
            )
        }} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})