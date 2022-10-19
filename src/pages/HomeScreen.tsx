import React from 'react'
import {Button, Text, TouchableOpacity, View } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenNav } from '../utils/Types';


type HomeScreen = NativeStackNavigationProp<ScreenNav, "HomeScreen">

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreen>();
  return (
    <Text>home</Text>
    )
}



//<Button title="Login" onPress={() => navigation.navigate('LogIn')} />