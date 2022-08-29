import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, Pressable } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';


//http://api.jikan.moe/v3/search/anime?q=Pikachu

//https://api.themoviedb.org/3/movie/now_playing?api_key=159a5ced39c57e82caa069eb69c9dfc0&language=en-US&page=1&region=CA

const Stack = createNativeStackNavigator();


const NowPlaying = ({ navigation, route }) => {

    const [movieData, setMovieData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getMovieFromAPI = () => {
        const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=159a5ced39c57e82caa069eb69c9dfc0&language=en-US&page=1&region=CA';

        return fetch(apiURL)
            .then((response) => response.json()
                .then((jsonData) => {
                    setMovieData(jsonData.results);
                    console.log(`Response JSON Data: ${jsonData.results.length}`);
                })
                .catch((error) => { console.log(`Error while getting json from response: ${error}`); })
                .finally(() => setLoading(false))
            )
            .catch((error) => { console.log(`Error while getting response from server: ${error}`); })
            .finally(() => setLoading(false))
    }

    //when the NowPlayinScreen components is created, call the getMovieFromAPI function
    useEffect(() => { 
        
        getMovieFromAPI() }, []);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => {
            console.log(`Clicked on Movie: ${item.title}`);
            navigation.navigate('MovieDetailsScreen',{item : item})
        }}>
            <View>
                <View style={styles.item}>
                    <View>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Text style={styles.releaseDate}>Release Date:{item.release_date}</Text>
                    </View>

                    <View>
                        <Icon name="angle-right" size={30} color="red" />
                    </View>
                </View>

                {/* Seperator */}
                <View style={styles.seperator}></View>
            </View>
        </Pressable>
    )

    return (
       
        <SafeAreaView>
            <Text style={styles.pageTitle}>Now Playing</Text>

            {isLoading ? (
                <ActivityIndicator animating={true} size="large" />
            ) : (
                <FlatList
                    data={movieData}
                    keyExtractor={(item) => { return item.id }}
                    renderItem={renderItem}
                />
            )}
        </SafeAreaView>
    )
}

export default NowPlaying

const styles = StyleSheet.create({
    pageTitle: {
        textAlign: 'center',
        padding: 10,
        fontSize: 25,

    },
    item: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
    },

    movieTitle: {
        fontSize: 20,
        marginLeft: 20,

    },
    releaseDate: {
        fontSize: 15,
        marginLeft: 20,
        marginBottom: 20,
    },
    seperator: {
        height: 1,
        backgroundColor: "#dddddd"
    }

})