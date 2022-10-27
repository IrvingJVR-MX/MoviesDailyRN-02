import { StyleSheet, View,FlatList, Text, TouchableOpacity ,SectionList, ScrollView ,Image, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react';
import { GenericPhotoPath}  from '../utils/Models/Generic'
import {MovieDetail, MovieRecommendation} from '../utils/Models/Movie'
import { CrewCastDetail} from '../utils/Models/Cast'
import {Trailer}  from '../utils/Models/Trailer'

import { theme } from '../utils/theme'
import {Rating} from 'react-native-rating-component';
import { getMovieCreditUrl, getMovieVideoUrl, getMovieRecommendationsUrl} from "../api/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import {CastListItem } from '../components/index'
import Modal from "react-native-modal";

import WebView from 'react-native-webview';

export default  function MovieDetailScreen({ route }) {
    const movie: MovieDetail =  route.params.movie;  

    const [MovieCredit, setMovieCredit] = useState<GenericPhotoPath>({title:"", data:[]});
    const [MovieRecommendation, setMovieRecommendation] = useState<GenericPhotoPath>({title:"", data:[]});
    const [MovieVideoKey, setMovieVideoKey] = useState<String>("crPl0ITIkS0");
    const [isModalVisible, setModalVisible] = useState(false);

    const movieRecommendationURL =  getMovieRecommendationsUrl(movie.id)  
    const movieCreditURL =  getMovieCreditUrl(movie.id)
    const MovieVideoURL =  getMovieVideoUrl(movie.id)  

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    useEffect(() => {

      fetch(MovieVideoURL)
      .then((response) => response.json())
      .then((data) =>{
        const trailer : Trailer= data        
        const trailerFilter = trailer.results.filter((obj) => {
          return obj.name === 'Official Trailer';
        });
        if (trailerFilter[0].key == ""){
          trailerFilter[0].key = "crPl0ITIkS0"
        }
        setMovieVideoKey(trailerFilter[0].key)
      }).catch(() => {
        setMovieVideoKey("crPl0ITIkS0")
      });

      fetch(movieCreditURL)
        .then((response) => response.json())
        .then((data) =>{
          const crewCastDetail : CrewCastDetail= data
          var photoPathArray: String[] = [] ;
          for (let i in crewCastDetail.cast ){
             if (crewCastDetail.cast[i].profile_path !=null){
              photoPathArray.push(crewCastDetail.cast[i].profile_path)
             }
          }
          const CastDetail: GenericPhotoPath = {title:"Cast", data: photoPathArray}
          setMovieCredit(CastDetail)
        })

      fetch(movieRecommendationURL)
        .then((response) => response.json())
        .then((data) =>{
          const movieRecommendation : MovieRecommendation= data
          var photoPathArray: String[] = [] ;
          for (let i in movieRecommendation.results ){
             if (movieRecommendation.results[i].poster_path !=null){
              photoPathArray.push(movieRecommendation.results[i].poster_path)
             }
          }
          const movieRecommendationDetail: GenericPhotoPath = {title:"Recommendations", data: photoPathArray}
          setMovieRecommendation(movieRecommendationDetail)
        })

    }, []);
    
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <Image source={{ uri:"https://image.tmdb.org/t/p/w500"+ movie.backdrop_path,}}
                style={styles.itemPhoto} resizeMode="stretch"
              />
            <View style={styles.viewTitle}>
              <Text style={styles.header}>{movie.title}</Text>
              <View style={styles.line}/> 
            </View>

            <View style={styles.rating}>
                <Rating
                initialValue={Number(movie.vote_average)/1.8}
                fillColorInactive={theme.colors.white}
                />
            </View>

            <Modal isVisible={isModalVisible}>
                <Text style={styles.close} onPress={toggleModal}>X</Text>
                <View style={{ height: 200 }}>
                  <WebView
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true}
                        domStorageEnabled={true}
                        source={{uri: 'https://www.youtube.com/embed/'+MovieVideoKey.toString() }}
                    />
                </View>
            </Modal>
            <TouchableOpacity style={styles.playButtonBackground} onPress={toggleModal} >
                <Ionicons style={styles.playButton} name="play" size={32} color={theme.colors.white} />
            </TouchableOpacity>
          <SectionList
            ListHeaderComponent={
              <View>
                <View style = {styles.overView} >
                  <Text style={styles.overviewText}>OverView</Text>
                  <Text style={styles.overviewContent}>{movie.overview}</Text>
                </View>

              </View>
            }
            contentContainerStyle={{ paddingHorizontal: 10 }}
            sections={[MovieCredit, MovieRecommendation]}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => 
                  <TouchableOpacity >
                    <CastListItem photoRef={item} />
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
      </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 5,
  },
  close:{
   fontSize: 25,
   width: 30,
   color: theme.colors.white,
   marginBottom:10,
   marginLeft:330
  },
  rating: {
    position:"absolute",
    marginTop:230,
    marginLeft:13 
  },
  container: {
    flex: 1,
    backgroundColor: "#ff",
  },
  overView: {
    marginLeft:13,
    marginTop:10
  },
  playButton:{
    marginLeft:10
  },
  playButtonBackground:{
    marginTop:280,
    marginLeft:310,
    position: "absolute",
    borderRadius:10,
    elevation:10,
    height:40,
    width: 50,
    backgroundColor:theme.colors.primary
  },
  overviewText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  overviewContent:{
    marginTop:10,
    justifyContent:"flex-start"
  },
  viewTitle:{
    position: "absolute",
    marginTop:150,
    marginLeft:13
  },
  itemPhoto: {
    height: '40%', 
    width: '100%', 
  },
  header: {
    fontSize: 24,
    color: theme.colors.white,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  line:{
    backgroundColor:theme.colors.white,
    height:8,
    width:70,
  }
})
