import React, { useState } from 'react'
import {emailValidator,passwordValidator, ScreenNav} from '../utils/index'
import {SignUpLogo,Button, TextInput} from '../components/index'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet} from "react-native"
import {getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {app} from '../../firebaseSetup';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import {LigthTheme} from '../utils/Theme/theme'

type SignUpScreen = NativeStackNavigationProp<ScreenNav,"SignUp">

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreen>();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const auth = getAuth(app);
  const dispatch = useDispatch();


  const onRegisterLogin = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = passwordValidator(confirmPassword.value)
    if(password.value != confirmPassword.value){
      setConfirmPassword ({ ...confirmPassword, error: "Password must match" })
    }
    if (emailError || passwordError || confirmPasswordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setConfirmPassword ({ ...confirmPassword, error: confirmPasswordError })
      return
    }

    createUserWithEmailAndPassword(auth,email.value, password.value)
    .then((userAuth) => {
      dispatch(
        login({
          email: userAuth.user.email,
          id: userAuth.user.uid,
        })
      );
      navigation.replace('LogIn')
    })
    .catch(error=> alert(error.message))
  }
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
     <SignUpLogo/>
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
      <TextInput
        label="Confirm password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
        description={undefined} 
      />
     <Button mode="contained" logo="" text={"Sign up "} onPress={onRegisterLogin} />
    </KeyboardAvoidingView>
    
   )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: LigthTheme.colors.login

  }
})

