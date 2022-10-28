import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { Appearance } from 'react-native';
import {Darktheme,LigthTheme} from '../utils/Theme/theme'

const colorScheme = Appearance.getColorScheme();

export default function ScreenHeader(props) {
  return( 
  <View>
      <Text style={styles.header} {...props} />
      <View style={styles.line}/>
  </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  line:{
    backgroundColor:LigthTheme.colors.primary,
    height:10,
    width:40,
  }
})
