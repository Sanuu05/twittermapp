import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Home from './Home';
import Myaccount from './Myaccount';
import Search from './Search';
import Allposts from './Allposts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from '../action/main';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();
const BottomNav = () => {
  const user = useSelector(state => state.user.user)
  const usertoken = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  const navitage = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
        dispatch(loadUser())
        if (user||usertoken) {
            navitage.navigate('Bottom')
        } else {
            navitage.navigate('Login')
        }
    }, [dispatch, usertoken
    ])


)
const [theme,settheme] = useState()
  
useFocusEffect(
    React.useCallback(() => {
        // dispatch(getmytData())
        async function fetchData() {
            // You can await here
            const sdata = await AsyncStorage.getItem('theme')
            settheme(sdata)
            // ...
          }
      
        fetchData()
        // setuser({...user,bio:userdata?.bio})
    }, [])


)

  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        tabBarStyle:{backgroundColor:theme==='White'||theme===null?'white':'#18181a'},
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName, color, size;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
            color = focused ? theme==='White'||theme===null?'black':'white' : "grey"
            size = focused ? 28 : 25
          }
          else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline"
            color = focused ? theme==='White'||theme===null?'black':'white' : "grey"
            size = focused ? 28 : 25
          }
          else if (route.name === "Account") {
            iconName = focused ? "person-sharp" : "person-outline"
            color = focused ? theme==='White'||theme===null?'black':'white' : "grey"
            size = focused ? 28 : 25
          }
          else if (route.name === "All") {
            iconName = focused ? "eye" : "eye-outline"
            color = focused ? theme==='White'||theme===null?'black':'white' : "grey"
            size = focused ? 28 : 25
          }
          return <Icon1 name={iconName} size={size} color={color} />
        },

      })}
    >
      <Tab.Screen name="Home" component={Home} options={{
        headerShown: false,
        // tabBarIcon: () =>
        //   <Icon1 name='md-chatbubbles-sharp' size={32} color="grey" />


      }} />



      <Tab.Screen name="Search" component={Search} options={{
        headerShown: false,
        // tabBarIcon: () =>
        //   <Icon1 name='person-circle-sharp' size={32} color="#557BF3" />


      }} />
      <Tab.Screen name="All" component={Allposts} options={{
        headerShown: false,
        title: 'Explore'
        // tabBarIcon: () =>
        //   <Icon1 name='settings-outline' size={32} color="#557BF3" />


      }}
      />
      <Tab.Screen name="Account" component={Myaccount} options={{
        headerShown: false,
        title: 'My Account'
        // tabBarIcon: () =>
        //   <Icon1 name='settings-outline' size={32} color="#557BF3" />


      }}
      />

      {/* <Tab.Screen name="Message" component={Message} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='home' size={22} color="orange" />


      }} /> */}
    </Tab.Navigator>
  )
}

export default BottomNav

const styles = StyleSheet.create({})