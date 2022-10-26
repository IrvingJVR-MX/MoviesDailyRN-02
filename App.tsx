import React from 'react';
import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen'
import {ScreenNav, MovieDetail}  from './src/utils/Types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MovieScreen from './src/pages/MovieScreen'
import TvShowScreen from './src/pages/TvShowScreen'
import ProfileScreen from './src/pages/ProfileScreen'
import MovieDetailScreen from './src/pages/MovieDetailScreen'


import { Provider } from 'react-redux';
import {store} from './src/app/store';


const Stack = createNativeStackNavigator<ScreenNav>();

export default function App() {
  const Drawer = createDrawerNavigator();
  const DrawerHome = () => (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
          <Drawer.Screen name='Movies' component={MovieScreen}  />
          <Drawer.Screen name='Tv Shows' component={TvShowScreen} />
          <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  )
  return (
    <Provider store={store}>
     <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name="LogIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={DrawerHome}  />
          <Stack.Screen options={{headerShown:false}} name='MovieDetailScreen' component={MovieDetailScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}
