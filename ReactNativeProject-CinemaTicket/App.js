import { StatusBar } from 'expo-status-bar';
import { useState , useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import NowPlaying from './screens/nowPlaying';
import MyPurchases from './screens/myPurchasesScreen';
import Logout from './screens/logoutScreen';

import { NowPlayingStackScreen, MyPurchasingStackScreen} from './CustomNavigation';

import  Icon  from 'react-native-vector-icons/FontAwesome';

import { auth } from "./FirebaseApp"
import { onAuthStateChanged, signOut } from "firebase/auth"

import LoginScreen from './screens/loginScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  //state variable to track if there is alogged in user
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
        if (userFromFirebaseAuth) {
            console.log(`A user is signed in: ${userFromFirebaseAuth.email}`)
            // set the state variable
            setUserLoggedIn(true);
        }
        else {
            console.log("There is no user signed in");
            setUserLoggedIn(false);
        }
    })
    return listener
}, [])

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={( {route}) => ({
        "tabBarStyle": [{
          "display":"flex"
        },null],
        "tabBarActiveTintColor":"orangered",
        "tabBarInactiveTintColor":"gray",
        "tabBarIcon": ( {focused, color , size}) => {
          let iconName;
          if (route.name === "NowPlayingStackScreen"){
            iconName = focused ? 'list' : 'bars';
          } else if (route.name === "MyPurchasingStackScreen"){
            iconName = focused ? 'ticket' : 'ticket';
          } else if (route.name === "LogoutScreen"){
            iconName = focused ? 'user' : 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        }
      })
       }>
        <Tab.Screen component={NowPlayingStackScreen} name="NowPlayingStackScreen" options={{headerShown: false}}/>
        <Tab.Screen component={MyPurchasingStackScreen} name="MyPurchasingStackScreen" 
        options={{headerShown: false, unmountOnBlur: true} }/>
        { (userLoggedIn === true) && <Tab.Screen component={Logout} name='LogoutScreen' /> }
      </Tab.Navigator>
    </NavigationContainer>

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
