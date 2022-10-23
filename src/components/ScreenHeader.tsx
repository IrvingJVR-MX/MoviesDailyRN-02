import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '../utils/theme'

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
    color: theme.colors.text,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  line:{
    backgroundColor:theme.colors.primary,
    height:10,
    width:40,
  }
})
