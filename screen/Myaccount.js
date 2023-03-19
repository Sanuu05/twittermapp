import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Modal, Button, Dimensions, ActivityIndicator, BackHandler,RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, getmytData, loadUser, Logout, unfollowUser, Updatedp } from '../action/main'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Posts from './Posts'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Header from './Header'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen')
const Myaccount = () => {
    const [heading, setheading] = useState()
    const [follower, setfollower] = useState(false)
    const [showedit, setshowedit] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const response = useSelector(state => state.response.posted)
    const dispatch = useDispatch()
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getmytData())
            dispatch(loadUser())
            setshowedit(false)
        }, [dispatch, response])


    )
    const [refreshing, setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            dispatch(getmytData())
            dispatch(loadUser())
            setRefreshing(false)
        });
    }, []);
    const myposts = useSelector(state => state.getmyposts.user)
    const userdata = useSelector(state => state.user.user)
    
    const navigate = useNavigation()
    // console.log('mm',userdata)

    const showImagePicker = async () => {
        // setload(false)
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            //   allowsEditing:true,
            base64: true,
            quality: 1,
        });
        const source = result.base64
        // setimagedata(result)
        if (source) {
            // setModalVisible(true)
            let base64Img = `data:image/jpg;base64,${source}`;
            let apiUrl =
                'https://api.cloudinary.com/v1_1/sannu/image/upload';
            let data = {
                file: base64Img,
                upload_preset: 'insta-clone'
            };

            fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
                .then(async response => {
                    let data = await response.json();
                    if (data.secure_url) {
                        //   alert('Upload successful');

                        dispatch(Updatedp({ pic: data.url }))
                    }
                })
                .catch(err => {
                    alert('Cannot upload');
                });

        }

        // Explore the result
        console.log(result.uri);

        if (!result.cancelled) {
            // setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                // Alert.alert("Hold on!", "Are you sure you want to go back?", [
                //     {
                //         text: "Cancel",
                //         onPress: () => null,
                //         style: "cancel"
                //     },
                //     { text: "YES", onPress: () => BackHandler.exitApp() }
                // ]);
                // BackHandler.exitApp() 
                console.log('hello')
                navigate.goBack()
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, [])


    )
    // useEffect(() => {

    // }, []);
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
    return (
        <SafeAreaView style={{
            // flex: 1,
            marginTop: 0, position: 'relative', height: height - 45,backgroundColor:theme==='White'||theme===null?'white':'black'
        }}>
            <Header center="true" title={userdata?.name} theme={theme} />
            <TouchableOpacity style={{ position: 'absolute', bottom: 55, right: 15, zIndex: 99, backgroundColor: '#1D9BF0', padding: 12, borderRadius: 99 }} onPress={() => navigate.navigate('Create')}>
                <Icon name='add-outline' size={35} color='white' />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}

            >

                <View style={{ height: height,backgroundColor:theme==='White'||theme===null?'white':'black', paddingTop: 50, paddingHorizontal: 10 }}>

                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={{ fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>Cancel</Text>
                        <Text style={{ fontSize: 25, fontFamily: 'Alegreya_700Bold',color:theme==='White'||theme===null?'black':'white' }}>{heading}</Text>
                        {
                            follower ? userdata?.followers?.map((v, i) => {
                                return <TouchableOpacity key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Image source={{
                                            uri: v?.profilePic
                                        }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 99 }} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 19,color:theme==='White'||theme===null?'black':'white' }}>{v?.name}</Text>
                                            <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 15, color: 'grey' }}>{v?.email}</Text>
                                        </View>

                                    </View>
                                    {v?._id === userdata?._id ? null :
                                        v?.followers?.includes(userdata?._id) ? <TouchableOpacity style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(unfollowUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'white' }}>Following</Text>
                                        </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(followUser({ followId: v?._id }))}>
                                            <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'white' }}>Follow</Text>
                                        </TouchableOpacity>
                                    }

                                </TouchableOpacity>

                            }) :
                                userdata?.following?.map((v, i) => {
                                    return <TouchableOpacity key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Image source={{
                                                uri: v?.profilePic
                                            }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 99 }} />
                                            <View style={{ marginLeft: 5 }}>
                                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 19,color:theme==='White'||theme===null?'black':'white' }}>{v?.name}</Text>
                                                <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 15, color: 'grey' }}>{v?.email}</Text>
                                            </View>

                                        </View>
                                        {v?._id === userdata?._id ? null :
                                            v?.followers?.includes(userdata?._id) ? <TouchableOpacity style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(unfollowUser({ followId: v?._id }))}>
                                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 15, color: 'white' }}>Following</Text>
                                            </TouchableOpacity> : <TouchableOpacity style={{ backgroundColor: 'orangered', paddingHorizontal: 15, paddingVertical: 7 }} onPress={() => dispatch(followUser({ followId: v?._id }))}>
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
                userdata ?

                    <ScrollView
                        style={{ paddingBottom: 10 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        contentContainerStyle={{ paddingBottom: 100 }} >
                        <TouchableOpacity activeOpacity={1} onPress={() => setshowedit(false)}>
                            <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CDCFCF', paddingBottom: 15, marginTop: 15, position: 'relative' }} >

                                <View style={{ position: 'absolute', right: 10, top: 4, zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Icon name='ellipsis-vertical' color={theme==='White'||theme===null?'black':'white'} size={25} onPress={() => setshowedit(true)} />
                                    {
                                        showedit ? <View style={{ backgroundColor: 'white', padding: 8, marginTop: 5, marginRight: 20, elevation: 20, borderRadius: 7,width:100 }}>
                                            {/* <TouchableOpacity style={{ marginTop: 15 }} onPress={showImagePicker}>
                                                <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 16 }}>Change Profile Pic</Text>
                                            </TouchableOpacity> */}
                                            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                                                // dispatch(Logout())
                                                navigate.navigate('Edit')
                                            }}>
                                                <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 18 }}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => {
                                                dispatch(Logout())
                                                navigate.navigate('Login')
                                            }}>
                                                <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 18,color:'red' }}>Logout</Text>
                                            </TouchableOpacity>
                                            
                                        </View> : null
                                    }

                                </View>

                                <View style={{ width: '45%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' ,marginTop:10}}>
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
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
                                        <View >
                                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 12,color:theme==='White'||theme===null?'black':'white' }} >Posts</Text>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18 ,color:theme==='White'||theme===null?'black':'white'}}>{myposts?.length}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setfollower(true)
                                            setModalVisible(true)
                                            setheading('Followers')
                                        }}>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 12,color:theme==='White'||theme===null?'black':'white' }} >Followers</Text>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }} >{userdata?.followers?.length}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setfollower(false)
                                            setModalVisible(true)
                                            setheading('Following')
                                        }}>
                                            <View >
                                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium', fontSize: 12,color:theme==='White'||theme===null?'black':'white' }} >Following</Text>
                                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>{userdata?.following?.length}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <View>
                            {myposts?.length > 0 ?
                                myposts?.map((val, i) => {
                                    return <Posts key={i} data={val} theme={theme} />
                                }) :
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#32CCFE" />
                                </View>
                            }

                        </View>
                    </ScrollView> :
                    <View style={{ height: height - 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#32CCFE" />
                    </View>
            }

        </SafeAreaView>
    )
}

export default Myaccount

const styles = StyleSheet.create({})