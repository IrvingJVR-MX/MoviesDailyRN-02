import { StyleSheet, View, FlatList, Text, SectionList, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import { ScreenHeader,MoviePosterListItem } from '../components/index'
import {Movie, MovieDetail}  from '../utils/Models/Movie'
import { getPopularMoviesUrl, getTopRatedMoviesUrl, getMustWatchMoviesUrl, getUpcomingMoviesUrl, getMovieCreditUrl} from "../api/url";
import { useNavigation } from '@react-navigation/native'
import { ScreenNav} from '../utils/Models/ScreenNav'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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



  useEffect(() => {
    fetch(popularMovieUrl)
      .then((response) => response.json())
      .then((data) =>{
        const movieDetails : MovieDetail[] = data.results
        const movies: Movie = { tile: 'Popular', data: movieDetails }
        setPopularMovies(movies)
      })
      .catch((error) => console.error(error))

      fetch(topRatedMoviesUrl)
      .then((response) => response.json())
      .then((data) =>{
        const topRatedMovies : MovieDetail[] = data.results
        const movies: Movie = { tile: 'Top Rated', data: topRatedMovies }
        setTopRatedMovies(movies)
      })
      .catch((error) => console.error(error))

      fetch(MustWatchMovieUrl)
      .then((response) => response.json())
      .then((data) =>{
        const mustWatchMovies : MovieDetail[] = data.results
        const movies: Movie = { tile: 'Must watch', data: mustWatchMovies }
        setMustWatchMovie(movies)
      })
      .catch((error) => console.error(error))

      fetch(upcomingMoviesUrl)
      .then((response) => response.json())
      .then((data) =>{
        const upcomingMovies : MovieDetail[] = data.results
        const movies: Movie = { tile: 'Coming soon', data: upcomingMovies }
        setupcomingMovies(movies)
      })
      .catch((error) => console.error(error))
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
    backgroundColor: "#ffffff",
  },
  screenHeader:{
    marginLeft: 20
  },
  sectionHeader: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 5,
  }

})
