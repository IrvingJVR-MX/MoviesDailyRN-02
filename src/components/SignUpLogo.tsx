import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function SignUpLogo() {
  return <Image source={require('../assets/movie.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
})
