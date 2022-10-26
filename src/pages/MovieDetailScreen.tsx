import { StyleSheet, View, FlatList, Text, SectionList, SafeAreaView, TouchableOpacity} from 'react-native'
import {Movie, MovieDetail}  from '../utils/Types'


export default  function MovieDetailScreen({ route }) {
    const  item  = route.params;
    console.log(item.movie)

  return (
  <View style={styles.container}>
        <Text>""</Text>
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
