import { StyleSheet, Text, TouchableOpacity, View, TextInput, Image,Dimensions, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'
import { postData } from '../action/main'
import AsyncStorage from '@react-native-async-storage/async-storage'
const { width, height } = Dimensions.get('screen')
const CreatePost = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const userdata = useSelector(state => state.user.user)
    const response = useSelector(state => state.response.posted)
    
    const [imagedata, setimagedata] = useState()
    const [postdata, setpostdata] = useState()
    const [load,setload] = useState(false)
    // console.log("respon",load)
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
        setimagedata(result)
        if (source) {
            // setModalVisible(true)

        }

        // Explore the result
        console.log(result.uri);

        if (!result.cancelled) {
            // setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    const sendphoto = () => {
        setload(true)
        if (imagedata) {
            
            let base64Img = `data:image/jpg;base64,${imagedata?.base64}`;
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

                        dispatch(postData({ body: postdata, photo: data.url }))
                    }
                })
                .catch(err => {
                    alert('Cannot upload');
                });

        }
        else{
            dispatch(postData({ body: postdata }))
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            if(response){
                // setload(false)
                navigate.goBack()
            }
            
        }, [response])


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
        <SafeAreaView style={{backgroundColor:theme==='White'||theme===null?'white':'black',height:height}}>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigate.goBack()}><Text style={{color:theme==='White'||theme===null?'black':'whitesmoke'}}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity disabled={load?true: imagedata || postdata ?false: true}   onPress={sendphoto} style={{ backgroundColor:load?'skyblue': imagedata || postdata?"#1D9BF0": 'skyblue', paddingHorizontal: 20, paddingVertical: 7, borderRadius: 99 }} ><Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 16,color:'white' }}>Post</Text></TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', padding: 5 }}>
                <View>
                    <Image source={{
                        uri: userdata?.profilePic
                    }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 99 }} />
                    <Icon name='image-sharp' size={35} color="#FF6666" onPress={showImagePicker}/>
                </View>

                <View style={{ flex: 1, marginLeft: 5 }}>
                    <ScrollView>
                    <TextInput placeholder='What Happening?' placeholderTextColor={theme==='White'||theme===null?'grey':'whitesmoke'} multiline={true} style={{fontFamily: 'Alegreya_500Medium',fontSize:18,color:theme==='White'||theme===null?'black':'whitesmoke'}} onChangeText={text=>setpostdata(text)} />
                    <Image source={{
                        uri:imagedata?.uri
                    }} style={{ width: '97%',height:undefined,aspectRatio:1}}  />
                    </ScrollView>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default CreatePost

const styles = StyleSheet.create({})