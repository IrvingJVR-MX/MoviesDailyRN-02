import { StyleSheet, View, FlatList, Text, SectionList, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScreenHeader,MoviePosterListItem } from '../components/index'
import {Movie, MovieDetail}  from '../utils/Models/Movie'
import { getPopularMoviesUrl, getTopRatedMoviesUrl, getMustWatchMoviesUrl, getUpcomingMoviesUrl} from "../api/url";
import { useNavigation } from '@react-navigation/native'
import { ScreenNav} from '../utils/Models/ScreenNav'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Appearance } from 'react-native';
import {Darktheme,LigthTheme} from '../utils/Theme/theme'
import { request} from "../api/fetch";

const colorScheme = Appearance.getColorScheme();

type MovieScreen = NativeStackNavigationProp<ScreenNav,"MovieScreen">

export default  function MovieScreen() {

  const navigation = useNavigation<MovieScreen>();

  const [popularMovies, setPopularMovies] = useState<Movie>({tile: "", data:[]});
  const popularMovieUrl =  getPopularMoviesUrl(1)
  
  const [topRatedMovies, setTopRatedMovies] = useState<Movie>({tile: "", data:[]});
  const topRatedMoviesUrl =  getTopRatedMoviesUrl(1)

  const [mustWatchMovie, setMustWatchMovie] = useState<Movie>({tile: "", data:[]});
  const MustWatchMovieUrl =  getMustWatchMoviesUrl(1)

  const [upcomingMovies, setupcomingMovies] = useState<Movie>({tile: "", data:[]});
  const upcomingMoviesUrl =  getUpcomingMoviesUrl(1)

  async function getData(url: string, name: string){
    const data = await request<MovieDetail[]>(url);
    const movieDetails : MovieDetail[] = data
    const movies: Movie = { tile: name, data: movieDetails }
      switch(name) { 
          case 'Popular': { 
            setPopularMovies(movies)
            break; 
          } 
          case 'Top Rated': { 
            setTopRatedMovies(movies)
            break; 
          } 
          case 'Coming soon': { 
            setupcomingMovies(movies)
            break; 
          }  
          case 'Must watch': { 
            setMustWatchMovie(movies)
            break; 
          }  
          default: {
            break; 
          } 
        } 
  }

  useEffect(() => {
    getData(popularMovieUrl,'Popular')
    getData(topRatedMoviesUrl,'Top Rated')
    getData(upcomingMoviesUrl,'Coming soon')
    getData(MustWatchMovieUrl,'Must watch')
  }, []);
  


  
  function onPress (Movie: MovieDetail) {
    navigation.navigate('MovieDetailScreen',{movie:Movie});
  }

  return (
  <View style={styles.container}>
        <SafeAreaView style={styles.container}>
         <View style={styles.screenHeader}>
            <ScreenHeader>Movies</ScreenHeader>
         </View>
        <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={[popularMovies, topRatedMovies, mustWatchMovie,upcomingMovies]}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.tile}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => 
                  <TouchableOpacity onPress={() => onPress(item)}>
                      <MoviePosterListItem {...item}/>
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
