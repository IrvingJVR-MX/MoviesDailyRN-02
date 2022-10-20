import React, { useState } from 'react'
import { ScreenNav } from '../utils/Types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet, View, Text,TouchableOpacity} from "react-native"
import TextInput from '../components/TextInput'
import { emailValidator } from '../utils/emailValidator'
import { passwordValidator } from '../utils/passwordValidator'
import Logo from '../components/SignUpLogo';
import Button from '../components/Button'
import {getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {app} from '../../firebaseSetup';

type SignUpScreen = NativeStackNavigationProp<ScreenNav,"SignUp">

export default function SignUp() {
  const navigation = useNavigation<SignUpScreen>();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })

  const auth = getAuth(app);

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
    .then( () => {
      navigation.navigate('LogIn')
    })
    .catch(error=> alert(error.message))
  }
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
     <Logo/>
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
    alignItems:'center'
  }
})

