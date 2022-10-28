import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { LigthTheme } from '../utils/Theme/theme'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={LigthTheme.colors.primary}
        outlineColor={LigthTheme.colors.primary}
        activeOutlineColor ={LigthTheme.colors.secondary}
        placeholderTextColor= {LigthTheme.colors.primary}
        activeUnderlineColor = {LigthTheme.colors.primary}
        underlineColorAndroid = {LigthTheme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginVertical: 12,
  },
  input: {
    textDecorationColor: LigthTheme.colors.white, 
    tintColor: LigthTheme.colors.white,
    textShadowColor: LigthTheme.colors.white,
    color:LigthTheme.colors.white, 
    backgroundColor: LigthTheme.colors.input,
  },
  description: {
    fontSize: 13,
    color: LigthTheme.colors.secondary,
  },
  error: {
    fontSize: 13,
    color: LigthTheme.colors.error,
    paddingTop: 8,
  },
})
