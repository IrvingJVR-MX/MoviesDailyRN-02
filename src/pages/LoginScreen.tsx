import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, Text,TouchableOpacity} from "react-native"
import {emailValidator,passwordValidator, ScreenNav,theme} from '../utils/index'
import {LoginLogo,Header,Button, TextInput} from '../components/index'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { getAuth, FacebookAuthProvider, signInWithCredential, signInWithEmailAndPassword, Auth } from 'firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import {app} from '../../firebaseSetup';




///REDUX
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/userSlice';
import { auth, onAuthStateChanged } from '../utils/firebase';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { createSlice } from '@reduxjs/toolkit'

import {userState} from "../utils/Types"



type LoginScreen = NativeStackNavigationProp<ScreenNav,"LogIn">

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreen>();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const auth = getAuth(app);
///REDUX
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            id: userAuth.uid
          })
        );
        navigation.replace('HomeScreen')
      } else {
        dispatch(logout());
      }
    });
  }, []);
///REDUX

/*
  //Check user loged
  useEffect(() =>{
    const unsubcribe = auth.onAuthStateChanged ( user =>{
      if (user){
        navigation.replace('HomeScreen')
      }
    })
    return unsubcribe
  },[])*/

  //Email login
  const onEmailLogin = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    signInWithEmailAndPassword(auth,email.value,password.value)
    .then( (userAuth) => {
      dispatch(
        login({
          email: userAuth.user.email,
          id: userAuth.user.uid
        })
      );
      navigation.replace('HomeScreen')
    })
    .catch(error=> alert(error.message))
  }
  
  //Facebook login
  const onFacebookLogin = async () => {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);
      signInWithCredential(auth, facebookAuthProvider)
      .then(() => {
        navigation.replace('HomeScreen')
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <LoginLogo/>
    <Header>Welcome to movies daily!</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address" 
        description={undefined}  
        />
      
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          description={undefined} 
        />
      <Button mode="contained" logo="" text={"Login in "} onPress={onEmailLogin} />
      <Button mode="contained" logo="facebook" text={"Login with Facebook"} onPress={onFacebookLogin} />
      <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>

   
    </KeyboardAvoidingView>
    

   )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

