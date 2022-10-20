import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/pages/HomeScreen';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp'
import { ScreenNav } from './src/utils/Types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';


//SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<ScreenNav>();

export default function App() {
  /*const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) { await SplashScreen.hideAsync(); }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
*/
  return (
   //<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onLayout={onLayoutRootView}>
     <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="LogIn" component={Login} />
          <Stack.Screen options={{headerShown:false}} name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUp} />

        </Stack.Navigator>
    </NavigationContainer>
    //</View>
  );
}