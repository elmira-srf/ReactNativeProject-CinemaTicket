import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { useEffect, useState } from "react"
import { db } from "../FirebaseApp"
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";

import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"

const BuyTicket = ({ navigation, route }) => {

    const ticketPrice = 12
    const salesTax = 0.13
    let tempQuantity = quantity + 1
    const { item } = route.params;

    const [loggedInUser, setLoggedInUser] = useState("");
    let [quantity, setQuantity] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [display, setDisplay] = useState(false);
    const [nameFromUI, setNameFromUI] = useState("")
    const [movieId, setMovieId] = useState("")
    const [movieName, setMovieName] = useState("")

    // hooks
    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                console.log(`A user is signed in: ${userFromFirebaseAuth.email}`)
                console.log(`***************`);
                console.log(`A user is signed in: ${userFromFirebaseAuth.uid}`)
                // set the state variable
                setLoggedInUser(userFromFirebaseAuth);
            }
            else {
                console.log("There is no user signed in");
                setLoggedInUser("")
            }
        })
        return listener
    }, [])

    const calculate = () => {
        const tempSub = tempQuantity * ticketPrice
        setSubtotal(tempSub)
        const tempTax = (tempSub * salesTax).toFixed(2)
        setTax(tempTax)
        const tempTotal = parseFloat(tempSub) + parseFloat(tempTax)
        setTotal(tempTotal)
    }
    const increaseQuantity = () => {
        tempQuantity = quantity + 1
        setQuantity(tempQuantity)
        setDisplay(true)
        calculate()
    }
    const decreaseQuantity = () => {
        if (quantity > 0) {
            tempQuantity = quantity - 1
            setQuantity(tempQuantity)
        }
        if (quantity - 1 == 0) {
            setDisplay(false)
        }
        calculate()
    }
    const confirmPurchase = async () => {
        console.log("confirm Purchase Pressed");
        if (nameFromUI == "" || quantity == 0) {
            Alert.alert("Enter your name and choose at least 1 ticket!")
        } else {

            const tempMovieId = item.id;
            setMovieId(tempMovieId);

            const tempMvieTitle = item.title;
            setMovieName(tempMvieTitle);

            try {
                const ticketToInsert = {
                    movieId: tempMovieId,
                    movieName: tempMvieTitle,
                    nameOnPurchase: nameFromUI,
                    numTickets: quantity,
                    total: total,
                    userId: loggedInUser.uid
                }
                const insertedDocument = await addDoc(collection(db, "purchases"), ticketToInsert)
                console.log(`Document created, id is: ${insertedDocument.id}`)

                Alert.alert("Purchase Success!")
                navigation.navigate("NowPlayingScreen")
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Buy Tickets</Text>
            <Text style={styles.subHeadingText}>{item.title}</Text>
            <View style={{ height: 300 }}>
                <Text style={styles.title}>Your email address:</Text>
                <Text style={styles.inputBox}>{loggedInUser.email}</Text>
                <Text style={styles.title}>Your name:</Text>
                <TextInput placeholder="Enter name" style={styles.inputBox} value={nameFromUI} onChangeText={setNameFromUI} />
                <Text style={styles.title}>Number of Tickets:</Text>
                <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={decreaseQuantity} style={styles.btn}>
                        <Text style={styles.btnText}>-</Text>
                    </Pressable>

                    <Text style={styles.title}>{quantity}</Text>

                    <Pressable onPress={increaseQuantity} style={styles.btn}>
                        <Text style={styles.btnText}>+</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ height: 250 }}>
                {display &&
                    <View>
                        <Text style={styles.title}>Order Summary:</Text>
                        <View style={styles.summeryContainer}>
                            <Text style={styles.summaryText}>{item.title}</Text>
                            <Text style={styles.summaryText}>Number of Tichets: {quantity}</Text>
                            <Text style={styles.summaryText}>Subtotal: ${subtotal}</Text>
                            <Text style={styles.summaryText}>Tax: ${tax}</Text>
                            <Text style={styles.total}>Total: ${total}</Text>
                        </View>
                    </View>
                }
            </View>
            <View style={{ padding: 10, height: 100 }}>
                <Pressable onPress={confirmPurchase} style={styles.btnPurchase}>
                    <Text style={styles.purchaseText}>Confirm Purchase</Text>
                </Pressable>
            </View>
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
    headingText: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 10
    },
    subHeadingText: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginTop: 8,
        marginBottom: 8,
        marginRight: 10

    },
    summaryText: {
        fontSize: 18,
        height: 30,
        padding: 10,
        paddingLeft: 15
    },
    summeryContainer: {
        borderWidth: 1,
        borderColor: "lightgrey",
    },
    total: {
        fontSize: 18,
        height: 45,
        padding: 10,
        marginBottom: 5,
        marginTop: 10,
        backgroundColor: "#F7BC00",
        paddingLeft: 15
    },
    inputBox: {
        height: 40,
        borderWidth: 1,
        borderColor: "#888",
        padding: 10,
        marginBottom: 12,
    },
    btnPurchase: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        backgroundColor: "#ff5252",
        borderColor: "#ff5252",
        marginTop: 10,
    },
    purchaseText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    btn: {
        borderWidth: 1,
        borderColor: "red",
        width: 30,
        height: 40,
        justifyContent: "center",
        textAlign: "center",
        marginRight: 10
    },
    btnText: {
        color: "red",
        fontSize: 15,
        margin: 10
    }
});

export default BuyTicket