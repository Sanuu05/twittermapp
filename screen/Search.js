import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity,FlatList,TouchableHighlight } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getallUser, loadUser } from '../action/main'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('screen')
const cardwidth = width / 2 - 30;
const Search = () => {
    const dispatch = useDispatch()
    const [searchdata, setsearchdata] = useState([])
    const navigation = useNavigation()
    const alluser = useSelector(state => state?.getuser?.alluser)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getallUser())
            dispatch(loadUser())
        }, [dispatch])


    )
    const userdata = useSelector(state => state.user.user)

    const search = (e) => {
        setsearchdata(e)
        if (e) {
            const newlist = alluser.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(e.toLowerCase())
            })
            setsearchdata(newlist)
        } else {
            setsearchdata([])
        }


    }
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
    
    const mapdata =alluser.map((v,i)=>{
        return userdata?.following?.some(p=>p._id===v?._id) || userdata?._id===v?._id ?undefined:v
        
    }).filter(p=>p!==undefined)
    console.log('fff', mapdata)
    return (
        <SafeAreaView style={{
            flex: 1, position: 'relative', padding: 15, backgroundColor: theme === 'White' || theme === null ? 'white' : 'black'
        }}>
            <View style={{ backgroundColor: '#ebebeb', height: 40, paddingHorizontal: 10, borderRadius: 30, marginHorizontal: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <TextInput placeholder='Search User By Name Or Email' style={{ flex: 1, backgroundColor: '#ebebeb', height: 40, paddingHorizontal: 10, borderRadius: 30, marginHorizontal: 5, fontSize: 17, fontFamily: 'Alegreya_700Bold' }} onChangeText={text => search(text)} />
                <Icon name='ios-search' size={25} />
            </View>
            <View>
                {
                    searchdata?.map((v, i) => {
                        return <TouchableOpacity key={i} style={{ marginVertical: 5, marginHorizontal: 10, display: 'flex', flexDirection: 'row' }} onPress={() => navigation.navigate('Userdetail', v?.email)}>
                            <Image source={{
                                uri: v?.profilePic
                            }} style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 99 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ fontFamily: 'Alegreya_700Bold', fontSize: 18,color:theme==='White'||theme===null?'black':'white' }}>{v?.name}</Text>
                                <Text style={{ fontFamily: 'Alegreya_500Medium', color: 'grey' }}>{v?.email}</Text>
                            </View>
                        </TouchableOpacity>
                    })
                }
            </View>
            <View>
                <View>
                    <Text style={{ fontFamily: 'Alegreya_700Bold', color: 'black',fontSize:22,marginTop:20,marginBottom:7,color:theme==='White'||theme===null?'black':'white' }}>People you may know</Text>
                </View>
                <FlatList
                    // horizontal
                    keyExtractor={(item, index) => index.toString()}
                    data={mapdata}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
                    renderItem={(element) => {
                        // console.log('vv',userdata?.following?.includes(element.item?._id))
                        // console.log(userdata?.following?.find(p=>p?._id===element.item?._id))
                      
                        return <TouchableHighlight style={[styles.cathcard, styles.shadowProp,{backgroundColor:theme==='White'||theme===null?'white':'#141414'}]} underlayColor="white" activeOpacity={0.9} onPress={() => navigation.navigate('Userdetail', element.item?.email)} >
                            <View style={[styles.cathcard1]} >
                                {/* <Icon name={element.item.icon} size={50} color="orange" /> */}
                                <Image
                                    source={{uri:element.item.profilePic}}
                                    style={{ height: 90, width: 90, resizeMode: 'contain',backgroundColor:'black',borderRadius:99 }}
                                />
                                <Text style={{ fontSize: 17, fontFamily: 'Alegreya_700Bold', marginTop: 2, textAlign: 'center',marginVertical:2,color:theme==='White'||theme===null?'black':'white' }}>{element.item?.name}</Text>
                                <Text style={{ fontSize: 10, fontFamily: 'Alegreya_700Bold', marginTop: 2,color:'grey', textAlign: 'center',marginVertical:2 }}>{element.item?.email}</Text>
                            </View>
                        </TouchableHighlight>
                        

                        
                    }}
                />
            </View>
        </SafeAreaView>

    )
}

export default Search

const styles = StyleSheet.create({
    cathcard: {
        padding: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: cardwidth,
        height: 140,
        borderRadius: 8,
        elevation: 2,
        
    
    
      },
      cathcardp: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: cardwidth,
        height: 220,
        borderRadius: 12,
        elevation: 2
    
    
    
      },
      cathcardpn: {
        padding: 10,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        width: cardwidth,
        minHeight: 220,
        borderRadius: 12,
        elevation: 2
    
    
    
      }
})