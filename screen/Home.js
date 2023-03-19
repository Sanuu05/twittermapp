import { ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Dimensions, BackHandler, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Posts from './Posts'
import { useDispatch, useSelector } from 'react-redux'
import { getfollowData } from '../action/main'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import Header from './Header'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen')

const Home = ({}) => {
    const dispatch = useDispatch()
    const response = useSelector(state => state.response.posted)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getfollowData())
        }, [dispatch, response])


    )
    const followposts = useSelector(state => state.getposts.follow)
    // console.log(followposts)
    const navitage = useNavigation()
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            dispatch(getfollowData())
            setRefreshing(false)
        });
    }, []);
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
    console.log('ttt',theme)
    // useEffect(()=>{
    //     const backAction =() =>{
    //         Alert.alert("Are you sure you want to exit?",[{
    //             text:"Cancel",
    //             onPress :() =>null,
    //             style:'cancel'
    //         },{
    //             text:'Yes',
    //             onPress:()=>BackHandler.exitApp()
    //         }])
    //         return true
    //     };
    //     const backhanderler = BackHandler.addEventListener("hardwareBackPress",backAction);
    //     return () =>backhanderler.remove();
    // })
   
    const back = true
    useEffect(() => {
        
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Hold on!", "Are you sure you want to go back?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                // BackHandler.exitApp() 
                return true;
            };
    
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );
    
            return () => backHandler.remove();
        }, [])


    )

    return (
        <SafeAreaView style={{
            position: 'relative', backgroundColor:theme==='White'||theme===null?'white':'black', height: height - 50
        }}>
            <TouchableOpacity style={{ position: 'absolute', bottom: 65, right: 15, zIndex: 99, backgroundColor: '#1D9BF0', padding: 12, borderRadius: 99 }} onPress={() => navitage.navigate('Create')}>
                <Icon name='add-outline' size={35} color='white' />
            </TouchableOpacity>
            <Header title="" />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={theme==='White'||theme===null?'#484a4a':'whitesmoke'}
                    />
                }
                style={{ paddingBottom: 10 }}
                contentContainerStyle={{ paddingBottom: 100 }} >
                <View>
                    {
                        followposts?.length>0 ?
                            followposts?.map((val, i) => {
                                return <Posts key={i} data={val} theme={theme} />
                            }) :
                            <View style={{ height: height-50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#32CCFE" />
                            </View>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})