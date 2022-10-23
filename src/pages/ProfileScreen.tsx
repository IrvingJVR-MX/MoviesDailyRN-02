import { StyleSheet, Text, View } from 'react-native'
import { getAuth,signOut } from 'firebase/auth'
import {app} from '../../firebaseSetup';
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import {ScreenNav} from '../utils/index'

type ProfileScreen = NativeStackNavigationProp<ScreenNav, "ProfileScreen">

export default function ProfileScreen () {
    const navigation = useNavigation<ProfileScreen>();
    const auth = getAuth(app);
    const onSignOut = () => {
        signOut(auth)
        .then( () => {
          navigation.replace('LogIn')
        })
        .catch(error=> alert(error.message))
      }
  return (
    <View>
      <Button mode="contained" logo="" text={"Log out"} onPress={onSignOut} />
    </View>
  )
}


const styles = StyleSheet.create({})