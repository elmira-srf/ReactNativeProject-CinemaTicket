import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"


const MovieDetails = ({ navigation, route }) => {

    const { uname } = route.params;
    const { item } = route.params;
    const [isDisabled, setDisabled] = useState(true);

    // state variable to store the currently logged user
    const [loggedInUser, setLoggedInUser] = useState(null)

    // hooks
    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                console.log(`A user is signed in: ${userFromFirebaseAuth.email}`)
                // set the state variable
                setLoggedInUser(userFromFirebaseAuth);
                setDisabled(false);
            }
            else {
                console.log("There is no user signed in");
                setLoggedInUser(null)
                setDisabled(true)
            }
        })
        return listener
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.movieImage}
                    source={{ url: `https://image.tmdb.org/t/p/w500${item.backdrop_path}` }} />
                <View style={styles.movieDetails}>
                    <View style={styles.titleSection}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Text style={styles.rating}>{item.vote_average * 10}%
                            <Icon name="star" size={25} color="#fed330" />
                        </Text>
                    </View>

                    <Text style={styles.releaseDate}>{item.release_date}</Text>

                    <Text style={styles.plotSummary}>Plot Summary</Text>
                    <Text style={styles.overview}>{item.overview}</Text>
                </View>
            </View>
            {/* https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg */}
            {/* https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg */}


            <View style={styles.buttonContainer}>
                {/* if user is not logged in */}
                {isDisabled && <Text style={styles.warningMessage}>You must be logged in to use this feature</Text>
                }

                <Pressable
                    onPress={() => {
                        if (!isDisabled){
                            navigation.navigate('BuyTicketsScreen', { item: item })
                        }
                    }}
                    disable={isDisabled}
                    style={[styles.newAccountButton,
                    {
                        backgroundColor: isDisabled ? "#dddddd" : "#ff5252",
                        borderColor: isDisabled ? "#aaaaaa" : "#ff5252",
                    }]} >
                    <Text
                        style={[styles.pressableNewAccountText, { color: isDisabled ? "#4b6584" : "white" }]}>
                        Buy Tickets</Text>
                </Pressable>

                {isDisabled &&
                    <Pressable
                        onPress={() => (
                            navigation.navigate("LoginScreen")
                        )}
                        style={styles.newAccountButton} >
                        <Text style={styles.pressableNewAccountText}>Login or Create New Account</Text>
                    </Pressable>
                }
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    movieImage: {
        width: '100%',
        height: 300,
    },
    movieDetails: {
        padding: 10,

    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    movieTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    rating: {
        fontSize: 25,
    },
    releaseDate: {
        fontSize: 20,
        color: "#807e7e"
    },
    plotSummary: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    overview: {
        textAlign: 'justify'
    },
    buttonContainer: {
        padding: 10,

    },
    warningMessage: {
        textAlign: 'center',
        marginTop: 40,

    },
    newAccountButton: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        backgroundColor: "#ff5252",
        borderColor: "#ff5252",
        borderRadius: 3,
        marginTop: 10,
    },
    pressableNewAccountText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
})


export default MovieDetails;