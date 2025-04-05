import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/Home";

const Tab=createBottomTabNavigator();
const Stack=createNativeStackNavigator();

const TabNavigator = () =>{
    return(
        <Tab.Navigator initialRouteName="Home" screenOptions={({route}) =>({tabBarIcon:({color, size})=>{
          let iconName
          if(route.name==="Home"){
            iconName = "home-outline"
          } else if (route.name==="Mi Cuenta"){
            iconName="person-outline"
          }
          else if (route.name==="Buscar"){
            iconName="search"
          }
          else if (route.name==="Mi Lista"){
            iconName="list-sharp"
          }
          return<Ionicons name={iconName} size={size}/>},
          tabBarActiveColor: '#ffff',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: "#F8FAFC"}
        })}>
            <Tab.Screen name="Home" component={Home} options={{}}/>
        </Tab.Navigator>
    )
}

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default MainNavigation