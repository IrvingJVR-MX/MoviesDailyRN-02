import { StyleSheet, View } from 'react-native'
import React from 'react'

type cardType = {
    color : String;
  }

export default function List (properties : cardType) {
  return (
    <View style={styles.view}>
         <View  style={{ width: 130, height: 150, backgroundColor: "#06283D"}}></View>
    </View>
  )
}


const styles = StyleSheet.create({
  view:{
    backgroundColor: '#fff',
    height: '100%',
  },
  screen:{  
    marginLeft: 16
  }
})
