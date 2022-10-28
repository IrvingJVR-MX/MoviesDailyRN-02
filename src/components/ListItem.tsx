import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import {GenericString}  from '../utils/Models/index'
import { Appearance } from 'react-native';
import {Darktheme,LigthTheme} from '../utils/Theme/theme'

const colorScheme = Appearance.getColorScheme();
export default function ListItem(info: GenericString) {
  return(
        <View style={styles.item}>
          <Image
            source={{
              uri:"https://image.tmdb.org/t/p/w500"+ info.photoRef,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
          />
          <Text style={styles.text}>{info.title}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
  item: {
    margin:10,
  },
  itemPhoto: {
    height: 150, 
    width: 100, 
    borderRadius: 20
  },
  text: {
    width:100,
    flexGrow: 1,
    flex: 1,
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black
}
})
