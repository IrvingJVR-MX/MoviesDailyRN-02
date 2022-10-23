import { StyleSheet, View,FlatList,TouchableOpacity } from 'react-native'
import React from 'react'
import {ScreenHeader} from '../components/index'
import List from '../components/List'

import { useRef } from "react";
import { useState } from "react";
const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `${randomColor}`;
};

type Squ = {
  color: string;
}

var rect: Squ[] = [{
  color: generateColor(),
}, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
, {
  color:generateColor(),
}, {
  color:generateColor(),
}
];
export default function MovieScreen () {
  const flatlist  = useRef<FlatList>(null)
  const [list, setList] = useState(rect)
  const changeColor = (idx:number)=>{
    //setExtraData(new Date())
    //getDataObject("lista", idx)
  }
  return (
    <View style={styles.view}>
      <View style={styles.screen}>
        <ScreenHeader>Movies</ScreenHeader>
  
      </View>
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
  },
  listItem: {
    marginTop:50,
    margin: 5,
    marginBottom:0
  }
})
