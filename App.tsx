import React from 'react';
import LoginScreen from './src/pages/LoginScreen';
import SignUpScreen from './src/pages/SignUpScreen'
import {ScreenNav}  from './src/utils/Models/ScreenNav';
import { NavigationContainer , DefaultTheme} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MovieScreen from './src/pages/MovieScreen'
import TvShowScreen from './src/pages/TvShowScreen'
import ProfileScreen from './src/pages/ProfileScreen'
import MovieDetailScreen from './src/pages/MovieDetailScreen'
import TvShowDetailScreen from './src/pages/TvShowDetailScreen'
import { Provider } from 'react-redux';
import {store} from './src/app/store';

import { Appearance,StyleSheet, StatusBar } from 'react-native';
import {Darktheme,LigthTheme} from './src/utils/Theme/theme'

const colorScheme = Appearance.getColorScheme();
const Stack = createNativeStackNavigator<ScreenNav>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:  colorScheme === 'dark' ? Darktheme.colors.white : LigthTheme.colors.white,
  },
};
/*drawerContentOptions={{
          activeTintColor: '#fff', 
          activeBackgroundColor: '#68f', 
          inactiveTintColor: 'grey',
        }} 
        */

export default function App() {
  const Drawer = createDrawerNavigator();
  const DrawerHome = () => (
    <Drawer.Navigator  screenOptions={{ headerShown: true, headerTintColor: 'white' ,headerStyle: { backgroundColor: '#fc6b02'},
     drawerStyle: {backgroundColor: '#fc6b02'}, drawerActiveTintColor:"white" }}>
          <Drawer.Screen name='Movies' component={MovieScreen}  />
          <Drawer.Screen name='Tv Shows' component={TvShowScreen} />
          <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  )
  return (
    <Provider store={store}>
     <NavigationContainer >
     <StatusBar animated={true} backgroundColor="transparent" barStyle={'dark-content'} translucent={true}/>
           <Stack.Navigator  screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }} >
          <Stack.Screen options={{headerShown:false}} name="LogIn" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={DrawerHome}  />
          <Stack.Screen options={{headerShown:false}} name='MovieDetailScreen' component={MovieDetailScreen}/>
          <Stack.Screen options={{headerShown:false}} name='TvShowDetailScreen' component={TvShowDetailScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:  colorScheme === 'dark' ? Darktheme.colors.white : LigthTheme.colors.white,
  },
})
