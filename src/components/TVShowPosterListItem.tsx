import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import {TVShowDetail}  from '../utils/Models/index'

export default function TVShowPosterListItem(photoPath: TVShowDetail) {
  return(
        <View style={styles.item}>
          <Image
            source={{
              uri:"https://image.tmdb.org/t/p/w500"+ photoPath.poster_path,
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
    height: 180, 
    width: 110, 
    borderRadius: 20
  }
})
