import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import {GenericString}  from '../../utils/Models/Generic'


export default function CastListItem(photo: GenericString) {
  return(
        <View style={styles.item}>
          <Image
            source={{
              uri:"https://image.tmdb.org/t/p/w500"+ photo.photoRef,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
        </View>
  )
}

const styles = StyleSheet.create({
  item: {
    margin: 10,
  },
  itemPhoto: {
    height: 150, 
    width: 100, 
    borderRadius: 20
  }
})
