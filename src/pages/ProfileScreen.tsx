import { StyleSheet, Text, View } from 'react-native'
import { getAuth,signOut } from 'firebase/auth'
import {app} from '../../firebaseSetup';
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import {ScreenNav} from '../utils/index'

import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { logout, selectUser } from '../features/userSlice';



type ProfileScreen = NativeStackNavigationProp<ScreenNav, "ProfileScreen">
  //var user = useAppSelector(state => state.user)
  import { useAppSelector } from "../app/hooks"

export default function ProfileScreen () {
    const navigation = useNavigation<ProfileScreen>();
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const onSignOut = () => {
        signOut(auth)
        .then( () => {
          dispatch(logout());
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