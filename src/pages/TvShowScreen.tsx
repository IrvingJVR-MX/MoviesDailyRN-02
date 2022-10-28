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
import { request} from "../api/fetch";

const colorScheme = Appearance.getColorScheme();
type TvShowScreen = NativeStackNavigationProp<ScreenNav,"TvShowScreen">


export default function TvShowScreen() {
  const navigation = useNavigation<TvShowScreen>();

  const [popularTVShow, setPopularTVShow] = useState<TVShow>({title: "", data:[]});
  const popularTVShowURL =  getPopularTVShowUrl(1)

  const [topRatedTVShow, setTopRatedTVShow] = useState<TVShow>({title: "", data:[]});
  const topRatedTVShowURL =  getTopRatedTVShowUrl(1)

  const [mustWatchTVShow, setMustWatchTVShow] = useState<TVShow>({title: "", data:[]});
  const mustWatchTVShowURL =  getMustWatchTVShowUrl(1)

  const [onTheAirTVShow, setOnTheAirTVShow] = useState<TVShow>({title: "", data:[]});
  const onTheAirTVShowURL =  getOnTheAirTVShowUrl(1)
  
  async function getData(url: string, name: string){
    const data = await request<TVShowDetail[]>(url);
    const tvShowDetails : TVShowDetail[] = data
    const tvShow: TVShow = { title: name, data: tvShowDetails }
      switch(name) { 
          case 'Popular': { 
            setPopularTVShow(tvShow)
            break; 
          } 
          case 'Top Rated': { 
            setTopRatedTVShow(tvShow)
            break; 
          } 
          case 'Must Watch': { 
            setMustWatchTVShow(tvShow)
            break; 
          }  
          case 'On The Air': { 
            setOnTheAirTVShow(tvShow)
            break; 
          }  
          default: {
            break; 
          } 
        } 
  }

  useEffect(() => {
    getData(popularTVShowURL,'Popular')
  }, []);

  useEffect(() => {
    getData(topRatedTVShowURL,'Top Rated')
  }, []);

  useEffect(() => {
    getData(mustWatchTVShowURL,'Must Watch')
  }, []);

  useEffect(() => {
    getData(onTheAirTVShowURL,'On The Air')
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
                <Text style={styles.sectionHeader}>{section.title}</Text>
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