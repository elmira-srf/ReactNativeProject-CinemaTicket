
import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NowPlaying from "./screens/nowPlaying"; //Tab1
import MovieDetails from "./screens/movieDetailsScreen";
import LoginScreen from "./screens/loginScreen";
import MyPurchases from "./screens/myPurchasesScreen"; //Tab22
import BuyTicket from "./screens/buyTicketsScreen";
import Logout from "./screens/logoutScreen";
// import Screen3 from "./screens/Screen3";


// creates object for Stack Navigator
const Stack = createNativeStackNavigator();  

const NowPlayingStackScreen = () => {

    
  return (
    <Stack.Navigator initialRouteName="NowPlayingScreen">   
       <Stack.Screen name="NowPlayingScreen" component={NowPlaying}/>
       <Stack.Screen name="MovieDetailsScreen" component={MovieDetails}/>
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="BuyTicketsScreen" component={BuyTicket}/>
       <Stack.Screen name="LogoutScreen" component={Logout}/>
    </Stack.Navigator>
  );
}

export {NowPlayingStackScreen}; // Stack-Navigator for first Tab

const MyPurchasingStackScreen = () => {
    
    return (
      <Stack.Navigator >
          <Stack.Screen
            name="MyPurchasesScreen"
            component={MyPurchases}
        />

      <Stack.Screen
             name="LoginScreen" 
            component={LoginScreen} 
      />
      </Stack.Navigator>
    );
  }
  
  export {MyPurchasingStackScreen}; // Stack-Navigator for Screen 2 Tab

//   const ThirdScreenNavigator = () => {
//     return (
//       <Stack.Navigator >
//           <Stack.Screen
//             name="Screen3"
//             component={Screen3}
//         />
//          <Stack.Screen
//           name="NestedScreen3"
//           component={NestedScreen}
//         />
//       </Stack.Navigator>
//     );
//   }
  
//   export {ThirdScreenNavigator};  // Stack-Navigator for Screen 3 Tab