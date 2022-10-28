import { StyleSheet, View,FlatList, Text, TouchableOpacity ,SectionList ,Image, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react';
import { GenericPhotoPath,GenericString}  from '../utils/Models/Generic'
import {Recommendation} from '../utils/Models/Recommendation'
import {MovieDetail} from '../utils/Models/Movie'
import { CrewCastDetail} from '../utils/Models/Cast'
import {Trailer}  from '../utils/Models/Trailer'
import {Rating} from 'react-native-rating-component';
import { getMovieCreditUrl, getMovieVideoUrl, getMovieRecommendationsUrl} from "../api/url";
import Ionicons from '@expo/vector-icons/Ionicons';
import {CastListItem } from '../components/index'
import Modal from "react-native-modal";
import WebView from 'react-native-webview';
import { request, requestData} from "../api/fetch";
import { Appearance } from 'react-native';
import {Darktheme,LigthTheme} from '../utils/Theme/theme'

const colorScheme = Appearance.getColorScheme();

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

    async function getMovieVideoURL(url: string){
      const data = await request<Trailer>(url);
      const trailer : Trailer= data  
      var key: string = "crPl0ITIkS0"  
      for( let i in trailer){
        if (trailer[i].name === "Official Trailer")
         {
          key = trailer[i].key
          break;
         }
      }
      setMovieVideoKey(key)
    }
    async function getMovieCredit(url: string){
      const crewCastDetail = await requestData<CrewCastDetail>(url);
      var photoPathArray: GenericString[] = [] ;
          for (let i in crewCastDetail.cast ){
             if (crewCastDetail.cast[i].profile_path!=null){
               var genericString:GenericString = {photoRef:crewCastDetail.cast[i].profile_path, title:
                crewCastDetail.cast[i].name}
              photoPathArray.push(genericString)
             }
          }
      const CastDetail: GenericPhotoPath = {title:"Cast", data: photoPathArray}
      setMovieCredit(CastDetail)
    }

    async function getMovieRecommendation(url: string){
      const movieRecommendation = await requestData<Recommendation>(url);
      var photoPathArray: GenericString[] = [] ;
          for (let i in movieRecommendation.results ){
             if (movieRecommendation.results[i].poster_path !=null){
              var genericString:GenericString = {photoRef:movieRecommendation.results[i].poster_path,
              title: movieRecommendation.results[i].title}
              photoPathArray.push(genericString)
             }
          }
          const movieRecommendationDetail: GenericPhotoPath = {title:"Recommendations", data: photoPathArray}
          setMovieRecommendation(movieRecommendationDetail)
      
    }

    useEffect(() => {
      getMovieVideoURL(MovieVideoURL)
    }, []);

    useEffect(() => {
      getMovieCredit(movieCreditURL)
    }, []);
  
    useEffect(() => {
      getMovieRecommendation(movieRecommendationURL)
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
                fillColorInactive={LigthTheme.colors.white}
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
                <Ionicons style={styles.playButton} name="play" size={32} color={LigthTheme.colors.white} />
            </TouchableOpacity>
          <SectionList
            style ={styles.body}
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
                    <CastListItem photoRef={item.photoRef} title={item.title}  />
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
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black
  },
  body:{
    backgroundColor: colorScheme === 'dark' ? Darktheme.colors.white : LigthTheme.colors.white,
  },
  close:{
   fontSize: 25,
   width: 30,
   color: LigthTheme.colors.white,
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
    marginTop:10,
  },
  playButton:{
    marginLeft:10
  },
  playButtonBackground:{
    marginTop:250,
    marginLeft:310,
    position: "absolute",
    borderRadius:10,
    elevation:10,
    height:40,
    width: 50,
    backgroundColor:LigthTheme.colors.primary
  },
  overviewText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black
  },
  overviewContent:{
    marginTop:10,
    justifyContent:"flex-start",
    color: colorScheme === 'dark' ? Darktheme.colors.black : LigthTheme.colors.black
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
    color: LigthTheme.colors.white,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  line:{
    backgroundColor:LigthTheme.colors.white,
    height:8,
    width:70,
  }
})
