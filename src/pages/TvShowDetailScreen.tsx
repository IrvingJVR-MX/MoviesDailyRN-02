import { StyleSheet, View,FlatList, Text, TouchableOpacity ,SectionList, ScrollView ,Image, SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react';
import {TVShow, TVShowDetail} from '../utils/Models/TvShow'
import { theme } from '../utils/theme'
import {Rating} from 'react-native-rating-component';
import { getTvShowCreditUrl, getTvShowVideoUrl,getTvShowRecommendationsUrl,getTvShowDetailUrl} from "../api/url";
import Modal from "react-native-modal";
import WebView from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';
import {TvShowDetail} from '../utils/Models/TvshowDetail'
import { GenericPhotoPath, GenericString}  from '../utils/Models/Generic'
import {CastListItem } from '../components/index'
import { CrewCastDetail} from '../utils/Models/Cast'
import {Recommendation} from '../utils/Models/Recommendation'
import {Trailer}  from '../utils/Models/Trailer'


export default  function TvShowDetailScreen({ route }) {
    const tvShow: TVShowDetail =  route.params.tvShow;  

    const [tvShowDetail, setTvShowDetail] = useState<GenericPhotoPath>({title:"", data:[]});
    const [tvShowCredit, setTvShowCredit] = useState<GenericPhotoPath>({title:"", data:[]});
    const [tvShowRecommendation, setTvShowRecommendation] = useState<GenericPhotoPath>({title:"", data:[]});
    const [tvShowVideo, setTvShowVideo] = useState<String>("crPl0ITIkS0");

    const [isModalVisible, setModalVisible] = useState(false);
    const tvShowDetailUrl =  getTvShowDetailUrl(tvShow.id)  
    const tvShowCreditUrl =  getTvShowCreditUrl(tvShow.id)  
    const tvShowRecommendationsUrl =  getTvShowRecommendationsUrl(tvShow.id)  
    const tvShowVideoUrl =  getTvShowVideoUrl(tvShow.id)  

    useEffect(() => {

      fetch(tvShowVideoUrl)
      .then((response) => response.json())
      .then((data) =>{
        const trailer : Trailer= data        
        const trailerFilter = trailer.results.filter((obj) => {
          return obj.name === 'Official Trailer';
        });
        if (trailerFilter[0].key == ""){
          trailerFilter[0].key = "crPl0ITIkS0"
        }
        setTvShowVideo(trailerFilter[0].key)
      }).catch(() => {
        setTvShowVideo("crPl0ITIkS0")
      });

      fetch(tvShowRecommendationsUrl)
      .then((response) => response.json())
      .then((data) =>{
        const movieRecommendation : Recommendation= data
        var photoPathArray: GenericString[] = [] ;
        for (let i in movieRecommendation.results ){
           if (movieRecommendation.results[i].poster_path !=null){
            var genericString:GenericString = {photoRef:movieRecommendation.results[i].poster_path,
            title: movieRecommendation.results[i].title}
            photoPathArray.push(genericString)
           }
        }
        const movieRecommendationDetail: GenericPhotoPath = {title:"Recommendations", data: photoPathArray}
        setTvShowRecommendation(movieRecommendationDetail)
      })


      fetch(tvShowCreditUrl)
        .then((response) => response.json())
        .then((data) =>{
          const crewCastDetail : CrewCastDetail= data
          var photoPathArray: GenericString[] = [] ;
          for (let i in crewCastDetail.cast ){
             if (crewCastDetail.cast[i].profile_path!=null){
               var genericString:GenericString = {photoRef:crewCastDetail.cast[i].profile_path, title:
                crewCastDetail.cast[i].name}
              photoPathArray.push(genericString)
             }
          }
          const CastDetail: GenericPhotoPath = {title:"Cast", data: photoPathArray}
          setTvShowCredit(CastDetail)
        })

      fetch(tvShowDetailUrl)
        .then((response) => response.json())
        .then((data) =>{
          const seasonDetail : TvShowDetail= data
          var genericStringArray: GenericString[] = [] ;
          for (let i in seasonDetail.seasons ){
            if(seasonDetail.seasons[i].poster_path!=null){
              let genericString: GenericString = {photoRef:seasonDetail.seasons[i].poster_path, title:
                seasonDetail.seasons[i].name}
              genericStringArray.push(genericString)
            }
          }
          const seasonDetailObj: GenericPhotoPath = {title:"Seasons", data: genericStringArray}
          setTvShowDetail(seasonDetailObj)
        })
    }, []);
    
    
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <Image source={{ uri:"https://image.tmdb.org/t/p/w500"+ tvShow.backdrop_path,}}
                style={styles.itemPhoto} resizeMode="stretch"
              />
            <View style={styles.viewTitle}>
              <Text style={styles.header}>{tvShow.name}</Text>
              <View style={styles.line}/> 
            </View>

            <View style={styles.rating}>
                <Rating
                initialValue={Number(tvShow.vote_average)/1.8}
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
                        
                        source={{uri: 'https://www.youtube.com/embed/'+tvShowVideo.toString() }}
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
                  <Text style={styles.overviewContent}>{tvShow.overview}</Text>
                </View>

              </View>
            }
            contentContainerStyle={{ paddingHorizontal: 10 }}
            sections={[tvShowDetail, tvShowCredit, tvShowRecommendation]}
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
    marginTop:240,
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
    fontSize: 20,
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



/*    <YoutubePlayer
                height={300}
                play={true}
                videoId={MovieVideoKey.toString()}
                />
     */