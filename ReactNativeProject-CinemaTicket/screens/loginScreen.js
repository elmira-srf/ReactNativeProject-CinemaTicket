import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import {useState } from "react"

// imports for Firebase auth
import { auth } from "../FirebaseApp"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth"

const LoginScreen = ({navigation}) => {

    const [emailAddressFromUI, setEmailAddress] = useState("");
    const [passwordFromUI, setPassword] = useState("");

    // state variables to hold the programmatically generated textView
    const [textViewToRender, setTextViewToRender] = useState();

    //Event Handlers
    const createNewAccount = async () => {
        console.log("Create New Account Button Presses");
        setTextViewToRender(
            <View >

            </View>)

        try {
            await createUserWithEmailAndPassword(auth, emailAddressFromUI, passwordFromUI);
            console.log("Acount created");
            navigation.goBack(null);

        } catch (err) {
            //set the  state variable to be add textView
            setTextViewToRender(
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{err.message}</Text>
                </View>)
        }
    }

    const loginPressed = async () => {
        console.log("Login Button Presses");
        setTextViewToRender(
            <View>

            </View>)

        try {
            // const userCredential = 
            await signInWithEmailAndPassword(auth, emailAddressFromUI, passwordFromUI);
            navigation.goBack(null);
            //uname : userCredential.user.email

        } catch (err) {
            //set the  state variable to be add textView
            setTextViewToRender(
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{err.message}</Text>
                </View>)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Login to Your Account</Text>
            <Text style={styles.headerSubitle}>You must be logged in to use this feature</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.labelInput}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    value={emailAddressFromUI}
                    onChangeText={setEmailAddress} >
                </TextInput>

                <Text style={styles.labelInput}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    value={passwordFromUI}
                    onChangeText={setPassword} 
                    secureTextEntry={true}>
                </TextInput>

                {textViewToRender}
            </View>

            <View style={styles.buttonContainer} >
                <Pressable
                    onPress={loginPressed}
                    style={styles.loginButton} >
                    <Text style={styles.pressableLoginText}>Login</Text>
                </Pressable>

                <Pressable
                    onPress={createNewAccount}
                    style={styles.newAccountButton} >
                    <Text style={styles.pressableNewAccountText}>Create New Account</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent:'center'
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 100,
    },
    headerSubitle: {
        fontSize: 20,
        textAlign: 'center',
    },
    inputContainer: {
        padding: 20,
    },
    labelInput: {
        fontSize: 15,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#888888",
        borderRadius: 3,
        marginBottom: 15,
        padding: 15
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: "#ff5252",
        width: 370,
        padding: 20,
        borderRadius: 3,
        marginBottom: 30,
    },
    newAccountButton: {
        width: 370,
        padding: 20,
        borderWidth: 1,
        borderColor: "#ff5252",
        borderRadius: 3
    },
    pressableLoginText: {
        color: 'white',
        textAlign: 'center', 
        fontSize: 20
    },
    pressableNewAccountText: {
        color: '#ff5252',
        textAlign: 'center',
        fontSize: 20
    },
    errorContainer: {
        borderRadius: 3,
        padding: 15,
        backgroundColor: 'red',
        marginBottom: 20,
    },
    errorText: {
        color: 'white'
    }
})

export default LoginScreen;