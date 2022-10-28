import { StyleSheet, View, FlatList, Text, SectionList, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import {ScreenHeader,TVShowPosterListItem } from '../components/index'
import {TVShow, TVShowDetail}  from '../utils/Models/TvShow'
import {getPopularTVShowUrl, getTopRatedTVShowUrl, getMustWatchTVShowUrl,getOnTheAirTVShowUrl } from "../api/url";
import { ScreenNav} from '../utils/Models/ScreenNav'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native'
import { Appearance } from 'react-native';
import {Darktheme,LigthTheme} from '../utils/Theme/theme'

const colorScheme = Appearance.getColorScheme();
type TvShowScreen = NativeStackNavigationProp<ScreenNav,"TvShowScreen">

export default function TvShowScreen() {
  const navigation = useNavigation<TvShowScreen>();

  const [popularTVShow, setPopularTVShow] = useState<TVShow>({tile: "", data:[]});
  const popularTVShowURL =  getPopularTVShowUrl(1)

  const [topRatedTVShow, setTopRatedTVShow] = useState<TVShow>({tile: "", data:[]});
  const topRatedTVShowURL =  getTopRatedTVShowUrl(1)

  const [mustWatchTVShow, setMustWatchTVShow] = useState<TVShow>({tile: "", data:[]});
  const mustWatchTVShowURL =  getMustWatchTVShowUrl(1)

  const [onTheAirTVShow, setOnTheAirTVShow] = useState<TVShow>({tile: "", data:[]});
  const onTheAirTVShowURL =  getOnTheAirTVShowUrl(1)
  
  useEffect(() => {
    fetch(popularTVShowURL)
      .then((response) => response.json())
      .then((data) =>{
        const tvShowDetails : TVShowDetail[] = data.results
        const tvShow: TVShow = { tile: 'Popular', data: tvShowDetails }
        setPopularTVShow(tvShow)
      })
      .catch((error) => console.error(error))

      fetch(topRatedTVShowURL)
      .then((response) => response.json())
      .then((data) =>{
        const tvShowDetails : TVShowDetail[] = data.results
        const tvShow: TVShow = { tile: 'Top Rated', data: tvShowDetails }
        setTopRatedTVShow(tvShow)
      })
      .catch((error) => console.error(error))

      fetch(mustWatchTVShowURL)
      .then((response) => response.json())
      .then((data) =>{
        const tvShowDetails : TVShowDetail[] = data.results
        const tvShow: TVShow = { tile: 'Must Watch', data: tvShowDetails }
        setMustWatchTVShow(tvShow)
      })
      .catch((error) => console.error(error))

      fetch(onTheAirTVShowURL)
      .then((response) => response.json())
      .then((data) =>{
        const tvShowDetails : TVShowDetail[] = data.results
        const tvShow: TVShow = { tile: 'On The Air', data: tvShowDetails }
        setOnTheAirTVShow(tvShow)
      })
      .catch((error) => console.error(error))

  }, []);

  function onPress (tvShowDetail: TVShowDetail) {
    navigation.navigate('TvShowDetailScreen',{tvShow:tvShowDetail});
  }

  
  return (
  <View style={styles.container}>
        <SafeAreaView style={styles.container}>
         <View style={styles.screenHeader}>
            <ScreenHeader>TV shows</ScreenHeader>
         </View>
        <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={[popularTVShow, topRatedTVShow, mustWatchTVShow, onTheAirTVShow]}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.tile}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => 
                  <TouchableOpacity onPress={() => onPress(item)}>
                    <TVShowPosterListItem {...item}/>
                  </TouchableOpacity>
                }
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )}
            renderItem={({ item, section }) => {
              return null;
            }}
          />
        </SafeAreaView>
    </View>

  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  colorScheme === 'dark' ? Darktheme.colors.white : LigthTheme.colors.white,
  },
  screenHeader:{
    marginLeft: 20
  },
  sectionHeader: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 5,
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black
  }

})