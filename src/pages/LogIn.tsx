import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View, Text,TouchableOpacity} from "react-native"
import { ScreenNav } from '../utils/Types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import TextInput from '../components/TextInput'
import Logo from '../components/LoginLogo';
import Header from '../components/Header';
import Button from '../components/Button'
import { getAuth, FacebookAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import {app} from '../../firebaseSetup';
import { emailValidator } from '../utils/emailValidator'
import { passwordValidator } from '../utils/passwordValidator'
import { theme } from '../utils/theme'

type LoginScreen = NativeStackNavigationProp<ScreenNav,"LogIn">

export default function Login() {
  const navigation = useNavigation<LoginScreen>();
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const auth = getAuth(app);

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
    .then( () => {
      navigation.navigate('HomeScreen')
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
        navigation.navigate('HomeScreen')
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <Logo/>
    <Header>Welcome!</Header>
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
     <Button mode="contained" logo="facebook" text={"Login in with Facebook"} onPress={onFacebookLogin} />
     <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
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
    alignItems:'center'
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

