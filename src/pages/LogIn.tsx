import React, { useState } from 'react'
import { Text, View} from "react-native"
import { ScreenNav } from '../utils/Types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import TextInput from '../components/TextInput'
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button2 from '../components/Button'


type LoginScreen = NativeStackNavigationProp<ScreenNav,"LogIn">

export default function Login() {
  const navigation = useNavigation<LoginScreen>();
  
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const onLoginPressed = () => {
    console.log("ea")
  }
  return (
    <View>
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
     <Button2 mode="contained" text={"Login in"} onPress={onLoginPressed} />
    </View>

   )
}
