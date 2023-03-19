import { ScrollView, StyleSheet, Text, TouchableOpacity, View,RefreshControl ,Dimensions, ActivityIndicator} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Posts from './Posts'
import { useDispatch, useSelector } from 'react-redux'
import { getfollowData, getpostData } from '../action/main'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
const {width,height} = Dimensions.get('screen')
const Allposts = () => {
    const dispatch = useDispatch()
    const response = useSelector(state => state.response.posted)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getpostData())
        }, [dispatch,response])


    )
    const followposts = useSelector(state => state.getposts.user)
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
    return (
        <SafeAreaView style={{
             position: 'relative',backgroundColor:theme==='White'||theme===null?'white':'black',height:height-50
        }}>
            <TouchableOpacity style={{ position: 'absolute', bottom: 65, right: 15, zIndex: 99, backgroundColor: '#1D9BF0', padding: 12, borderRadius: 99 }} onPress={()=>navitage.navigate('Create')}>
                <Icon name='add-outline' size={35} color='white' />
            </TouchableOpacity>
<Header title="Explore" theme={theme}/>
            <ScrollView 
             refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={{ paddingBottom: 10 }}
            contentContainerStyle={{paddingBottom:100}} >
                <View>
                    {followposts?.length>0?
                        followposts?.map((val, i) => {
                            return <Posts key={i} data={val} theme={theme} />
                        }):
                        <View style={{ height: height-50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#32CCFE" />
                            </View>
                    }

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Allposts

const styles = StyleSheet.create({})