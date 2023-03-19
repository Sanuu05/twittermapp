import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { loadUser, Updatedp } from '../action/main'
import RadioButtonRN from 'radio-buttons-react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('screen')
const Edit = () => {
    const dispatch = useDispatch()
    const [change,setchange] = useState(false)
    const response = useSelector(state => state.response.posted)
    useFocusEffect(
        React.useCallback(() => {
            // dispatch(getmytData())
            dispatch(loadUser())
        }, [dispatch,response])


    )

    const [user, setuser] = useState({
        name: '', bio: ''
    })
    const userdata = useSelector(state => state.user.user)
    console.log(userdata?.name)
    useFocusEffect(
        React.useCallback(() => {
            // dispatch(getmytData())
            setuser({ ...user, name: userdata?.name,bio:userdata?.bio })
            // setuser({...user,bio:userdata?.bio})
        }, [dispatch])


    )
    const [theme,settheme] = useState()
    const [stheme,setstheme] = useState()
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
            if(response){
                alert("Updated Sucessfully")
            }
        }, [change,response])


    )
    console.log('cc',response)
    
    const data = [
        {
            label: 'White'
        },
        {
            label: 'Dark'
        }
    ];
    const savedata =async()=>{
        console.log(stheme?.label)
        try {
            await AsyncStorage.setItem('theme',stheme?.label)
            dispatch(Updatedp(user))
            // console.log(user)
            setchange(!change)
        } catch (error) {
            console.log('err',error)
        }
      

    }
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

                        dispatch(Updatedp({ profilePic: data.url }))
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
    
    return (
        <View style={{backgroundColor:theme==='White'||theme===null?'white':'black',height:height}}>
            <SafeAreaView>
                <Header title="Edit" theme={theme} />
                <View>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginVertical: 15 }}>
                        <Image source={{
                            uri: userdata?.profilePic
                        }} style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 99 }} />
                        <TouchableOpacity onPress={showImagePicker}>
                            <Text style={{ color: '#1D9BF0', fontFamily: 'Alegreya_700Bold', fontSize: 17, marginVertical: 5 }}>Change profile photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 17,color:theme==='White'||theme===null?'black':'white'  }}>Name</Text>
                            </View>
                            <TextInput placeholder='Name' placeholderTextColor={theme==='White'||theme===null?'grey':'whitesmoke'} style={{ flex: 1, fontSize: 16,color:theme==='White'||theme===null?'black':'whitesmoke' }} value={user?.name} onChangeText={(text) => setuser({ ...user, name: text })} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 17,color:theme==='White'||theme===null?'black':'white'  }}>Bio</Text>
                            </View>
                            <TextInput placeholder='Bio' placeholderTextColor={theme==='White'||theme===null?'grey':'whitesmoke'} style={{ flex: 1, fontSize: 16,color:theme==='White'||theme===null?'black':'whitesmoke' }} value={user?.bio} onChangeText={(text) => setuser({ ...user, bio: text })} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                            <View style={{ width: '30%' }}>
                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 17 ,color:theme==='White'||theme===null?'black':'white' }}>Theme</Text>
                            </View>
                            <RadioButtonRN style={{flex:1}}
                            data={data}
                            selectedBtn={(e)=> setstheme(e)}
                            initial={theme===null||theme==="White"?1:2}
                            
                            
                        />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: 15 }}>
                            <TouchableOpacity style={{backgroundColor:'#1D9BF0',paddingHorizontal:15,paddingVertical:7,elevation:5}} onPress={savedata}> 
                                <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 16,color:'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                       
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default Edit

const styles = StyleSheet.create({})