import React from 'react'
import { StyleSheet } from 'react-native'
import { LigthTheme } from '../utils/Theme/theme'
import { Button as PaperButton } from 'react-native-paper'

export default function Button({ mode,logo, text, ...props }) {
  return (
     <PaperButton 
     mode={mode}  
     icon= {logo}         
     labelStyle={styles.text}
     style={styles.button}
     {...props}>
     {text}
     </PaperButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: LigthTheme.colors.primary
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
