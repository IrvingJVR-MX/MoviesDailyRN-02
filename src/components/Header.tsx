import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { LigthTheme } from '../utils/Theme/theme'

export default function Header(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: LigthTheme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})
