import React from 'react'
import { StyleSheet } from 'react-native'
import { theme } from '../utils/theme'
import { Button as PaperButton } from 'react-native-paper'

export default function Button({ mode, text, ...props }) {
  return (
     <PaperButton 
     mode={mode}           
     labelStyle={styles.text}
     style={styles.button}
     {...props}>
     {text}
     </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: theme.colors.primary
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
