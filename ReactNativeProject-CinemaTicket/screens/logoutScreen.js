import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import { auth } from "../FirebaseApp"
import { signOut } from "firebase/auth"

const Logout = ({navigation}) => {

    const btnLogoutPressed = async () => {
        try {
            await signOut(auth);
            navigation.navigate("NowPlayingScreen");
        } catch (err) {
            Alert.alert(`Logout failed: ${err.message}`)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Are you ready to logout?</Text>
            <Pressable onPress={btnLogoutPressed} style={styles.logoutButton}>
            <Text style={styles.textLogout}> Logout </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 10,
        height: 800
    },
    headingText: {
        fontSize: 24,
        textAlign: "center"
    },
    logoutButton: {
        backgroundColor: "#FC4C4E",
        height: 50, 
        justifyContent: "center",
        margin: 10, 
    },
    textLogout: {
        color: "white",
        textAlign: "center",
        fontSize: 20
    }
});

export default Logout;