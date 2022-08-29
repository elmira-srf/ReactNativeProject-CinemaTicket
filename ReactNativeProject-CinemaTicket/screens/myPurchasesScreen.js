import { StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { useEffect, useState } from "react"
import { db } from "../FirebaseApp"
import { collection, getDocs } from "firebase/firestore";
import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"


const MyPurchases = ({ navigation, route }) => {

    const [loggedInUser, setLoggedInUser] = useState("")
    const [purchaseList, setPurchaseList] = useState([])
    const [isLoggedin, setIsLoggedin] = useState(false)

   
    
    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                console.log(`The user is signed in: ${userFromFirebaseAuth.email}`)

                // set the state variable
                setLoggedInUser(userFromFirebaseAuth)
                setIsLoggedin(true)

                // get the list of movies from firebase
                getFirebaseData();

            } else {
                setLoggedInUser(null)
                setIsLoggedin(false)
            }
        })
        return listener
        getFirebaseData();
    }, []);

    const getFirebaseData = async () => {
        let tempUser = '';

        onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                console.log(`GGGG: ${userFromFirebaseAuth.email}`)
    
                // set the state variable
                tempUser = userFromFirebaseAuth;
                setLoggedInUser(tempUser)
                setIsLoggedin(true)
    
            } else {
                setLoggedInUser(null)
                setIsLoggedin(false)
            }
        })

        try {

            //retrieve the specified document
            const querySnapshot = await getDocs(collection(db, "purchases"));

            // retrieve the documents in an array of documents
            const documents = querySnapshot.docs;

            const currUserList = []

            for (let i = 0; i < documents.length; i++) {
                if (documents[i].data().userId === tempUser.uid) {
                    currUserList.push(documents[i])
                }
            }
            // set the state variable
            setPurchaseList(currUserList);

        } catch (err) {
            console.log(err.message)
        }
    }
    // new component that outputs the UI for the divider
    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "lightgrey" }} />
        )
    }
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <View>
                <Image source={require('../assets/ticket.png')} style={styles.img} />
            </View>
            <View style={{ width: 320 }}>
                <Text style={styles.title}>{item.data().movieName}</Text>
                <Text style={styles.number}>Num Tickets: {item.data().numTickets}</Text>
                <Text style={styles.total}>Total Paid: {item.data().total}</Text>
            </View>
        </View>
    );
    return (
        <View>
            {isLoggedin &&
                <View style={styles.container}>
                    <Text style={styles.headingText}>Your Tickets</Text>

                    <View>
                        <FlatList
                            data={purchaseList}
                            renderItem={renderItem}
                            keyExtractor={(item) => { return item.id }}
                            ItemSeparatorComponent={ItemDivider}
                        />
                    </View>
                </View>
            }
            {
                !isLoggedin &&
                <View style={styles.loginContainer}>
                    <Text style={styles.headingText}>Your Tickets</Text>

                    <Text style={{ fontSize: 16 }}>You must be logged in to use this feature.</Text>
                    <Pressable
                        onPress={() => (
                            navigation.navigate("LoginScreen")
                        )}
                        style={styles.loginBtn} >
                        <Text style={styles.loginText}>Login or Create New Account</Text>
                    </Pressable>
                </View >
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: 'white',
        alignItems: 'stretch',
        height: 800,
        padding: 10
    },
    loginContainer: {
        justifyContent: "center",
        backgroundColor: 'white',
        alignItems: "center",
        height: 800,
        padding: 10
    },
    headingText: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 10
    },
    title: {
        fontSize: 18,
        marginTop: 8
    },
    number: {
        fontSize: 16,
    },
    total: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
    img: {
        height: 53,
        width: 53,
        marginTop: 15,
        marginRight: 10
    },
    loginBtn: {
        padding: 15,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 1,
        backgroundColor: "#ff5252",
        borderColor: "#ff5252",
        marginTop: 10,
    },
    loginText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
});
export default MyPurchases