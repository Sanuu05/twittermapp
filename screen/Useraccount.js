import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Button, Dimensions, ActivityIndicator,RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, getmytData, GetPostByUser, getUser, unfollowUser } from '../action/main'
import { useFocusEffect } from '@react-navigation/native'
import Posts from './Posts'

import { useState } from 'react'
import Header from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen')
const Useraccount = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()
    const response = useSelector(state => state.response.posted)
    const [heading, setheading] = useState()
    const [follower, setfollower] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getUser(props.route?.params))
            dispatch(GetPostByUser(props.route?.params))
        }, [dispatch, props.route?.params, response])


    )
    const myposts = useSelector(state => state.getposts.peruser)
    // const userdata = useSelector(state => state.user.user)
    const userdata = useSelector(state => state.getuser.user)
    const user = useSelector(state => state.user.user)
    // console.log('mm',userdarta)
    const [theme, settheme] = useState()

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
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            dispatch(getUser(props.route?.params))
            dispatch(GetPostByUser(props.route?.params))
            setRefreshing(false)
        });
    }, []);
    return (
        <SafeAreaView style={{
            // flex: 1,
            marginTop: 0,
            height:height-40,
            position:'relative',backgroundColor:theme==='White'||theme===null?'white':'black'
        }}>
            <Header center={true} title={userdata?.name} theme={theme} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}

            >

                <View style={{ height: height, backgroundColor: 'whitesmoke', paddingTop: 50, paddingHorizontal: 10,backgroundColor:theme==='White'||theme===null?'white':'black' }}>
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(false)}>
                        <Text style={{ fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>Cancel</Text>
                        <Text style={{ fontSize: 25, fontFamily: 'Alegreya_700Bold',color:theme==='White'||theme===null?'black':'white' }}>{heading}</Text>
                        {
                            follower ? userdata?.followers?.map((v, i) => {
                                return <TouchableOpacity activeOpacity={0.8} key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Image source={{
                                            uri: v?.profilePic
                                        }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 99 }} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 19,color:theme==='White'||theme===null?'black':'white' }}>{v?.name}</Text>
                                            <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 15, color: 'grey' }}>{v?.email}</Text>
                                        </View>

                                    </View>
                                    {v?._id === user?._id ? null :
                                        v?.followers?.includes(user?._id) ? <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 ,borderWidth:0.5,borderColor:'grey'}} onPress={() => dispatch(unfollowUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'black' }}>Following</Text>
                                        </TouchableOpacity > : <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(followUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'white' }}>Follow</Text>
                                        </TouchableOpacity>
                                    }

                                </TouchableOpacity>

                            }) :
                                userdata?.following?.map((v, i) => {
                                    return <TouchableOpacity activeOpacity={0.8} key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Image source={{
                                                uri: v?.profilePic
                                            }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 99 }} />
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 19,color:theme==='White'||theme===null?'black':'white' }}>{v?.name}</Text>
                                                <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 15, color: 'grey' }}>{v?.email}</Text>
                                            </View>

                                        </View>
                                        {v?._id === user?._id ? null :
                                        v?.followers?.includes(user?._id) ? <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 7,borderWidth:0.5,borderColor:'grey' }} onPress={() => dispatch(unfollowUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'black' }}>Following</Text>
                                        </TouchableOpacity> : <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(followUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'white' }}>Follow</Text>
                                        </TouchableOpacity>
                                    }
                                    </TouchableOpacity>
                                })
                        }

                    </TouchableOpacity>


                </View>



            </Modal>
            {
                userdata?
            
            <ScrollView style={{ paddingBottom: 10 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            contentContainerStyle={{ paddingBottom: 100 }} >
            <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CDCFCF', paddingBottom: 15 }}>
                
                <View style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' ,marginTop:10 }}>
                    <Image source={{
                        uri: userdata?.profilePic
                    }} style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 99 }} />
                     <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 14,color:theme==='White'||theme===null?'black':'white',marginLeft:5,marginVertical:5 }}>{userdata?.bio}</Text>
                </View>
                <View style={{ flex: 1, paddingRight: 15 }}>
                    <View>
                        <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 25,color:theme==='White'||theme===null?'black':'white' }}>{userdata?.name}</Text>
                        <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 17, color: 'grey' }} >{userdata?.email}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <View >
                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 17,color:theme==='White'||theme===null?'black':'white' }} >Posts</Text>
                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>{myposts?.length}</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setfollower(true)
                            setModalVisible(true)
                            setheading('Followers')
                        }}>
                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 17,color:theme==='White'||theme===null?'black':'white' }} >Followers</Text>
                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }} >{userdata?.followers?.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setfollower(false)
                            setModalVisible(true)
                            setheading('Following')
                        }}>
                            <View >
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 17,color:theme==='White'||theme===null?'black':'white' }} >Following</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>{userdata?.following?.length}</Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                    {userdata._id === user?._id ? null :
                        userdata?.followers?.find(p => p._id === user._id) ?
                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'white', width: 100, borderRadius: 4,borderWidth:0.5,borderColor:'grey' }} onPress={() => dispatch(unfollowUser({ followId: userdata?._id }))}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 18, color: 'black', paddingVertical: 6 }}>Following</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: '#1D9BF0', width: 100, borderRadius: 4 }} onPress={() => dispatch(followUser({ followId: userdata?._id }))}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 18, color: 'white', paddingVertical: 6 }}>Follow</Text>
                            </TouchableOpacity>
                    }

                </View>
            </View>
            
                <View>
                    { myposts?.length>0?
                        myposts?.map((val, i) => {
                            return <Posts key={i} data={val} theme={theme} />
                        }):
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#32CCFE" />
                            </View>
                    }

                </View>
            </ScrollView>:
            <View style={{ height: height-50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#32CCFE" />
        </View>
}


        </SafeAreaView>
    )
}

export default Useraccount

const styles = StyleSheet.create({
    centeredView1: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
        marginTop: 80
    }
})