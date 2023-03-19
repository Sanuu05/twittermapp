import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { Comment, Delete, like, unlike } from '../action/main'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
const Posts = ({ data,theme }) => {
    const dispatch = useDispatch()
    const [comment, setcomment] = useState()
    const [showcomment, setshowcomment] = useState(false)
    const user = useSelector(state => state.user.user)
    const navigate = useNavigation()

    return (
        <View >
            <View style={styles.postmain}>
                {/* <View style={styles.postleft}>
                    
                    

                </View> */}
                <View style={{ borderBottomColor: '#CDCFCF', borderBottomWidth: 0.5 }} >
                    <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => data?.postedBy?.email === user?.email ? navigate.navigate('Account') : navigate.navigate('Userdetail', data?.postedBy?.email)}>
                                <Image source={{
                                    uri: data?.postedBy?.profilePic
                                }} style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 99 }} />
                            </TouchableOpacity>
                            <View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginLeft: 5 }}>
                                    <Text style={{ marginTop: 5, fontSize: 17, fontFamily: 'Alegreya_700Bold',color:theme==='White'||theme===null?'black':'white' }}>{data?.postedBy?.name}</Text>
                                    <Text style={{ marginTop: 5, fontSize: 11, fontFamily: 'Alegreya_700Bold', marginLeft: 5, color: 'grey' }}>{data?.date}</Text>
                                </View>
                                <Text style={{ marginTop: -1, fontSize: 11, fontFamily: 'Alegreya_700Bold', marginLeft: 5, color: 'grey' }}>{data?.postedBy?.email}</Text>
                            </View>
                           
                        </View>
                        {
                            data?.postedBy?._id===user?._id?
                            <View>
                                <Icon1 name='trash' color="grey" size={23} onPress={()=>dispatch(Delete(data?._id))}  />
                            </View>:null
                        }
                        

                    </View>


                    {
                        data?.photo ? <Image source={{
                            uri: data?.photo
                        }} style={{ width: '100%', height: 250, resizeMode: 'contain', borderRadius: 10, marginTop: 5 }} /> : null
                    }
                    <Text style={{ color:theme==='White'||theme===null?'#484a4a':'whitesmoke', marginTop: 5, fontFamily: 'Alegreya_700Bold', fontSize: 15 }}>{data?.body}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                        <TouchableOpacity onPress={() => setshowcomment(!showcomment)} >
                            <Text style={{ marginTop: 5, fontSize: 14, fontFamily: 'Alegreya_700Bold', color: 'grey' }}>See Comments ({data?.comments?.length})</Text>
                        </TouchableOpacity>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    showcomment ? <Icon1 name='chatbubble-sharp' size={25} color="grey" onPress={() => setshowcomment(false)} /> : <Icon1 name='chatbubble-outline' size={25} color="grey" onPress={() => setshowcomment(true)} />
                                }

                                <Text style={{ marginLeft: 3, fontSize: 15, fontFamily: 'Alegreya_700Bold', color: 'grey' }}>{data?.comments?.length}</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                {
                                    data?.likes?.includes(user?._id) ? <Icon1 name='heart' size={25} onPress={() => dispatch(unlike({ postId: data?._id }))} color="red" /> :
                                        <Icon1 name='heart-outline' size={25} color="grey" onPress={() => dispatch(like({ postId: data?._id }))} />

                                }

                                {/* <Icon1 name='heart-outline' size={25} onPress={()=>dispatch(like({postId:val?._id}))} /> */}
                                <Text style={{ marginLeft: 3, fontSize: 15, fontFamily: 'Alegreya_700Bold', color: 'grey' }}>{data?.likes?.length}</Text>
                            </View>

                        </View>



                    </View>
                    {
                        showcomment ?
                            <View style={{ paddingHorizontal: 17 }}>
                                <View style={{}}>
                                    <Text style={{ fontFamily: 'Alegreya_500Medium', fontSize: 17 ,color:theme==='white'||theme===null?'black':'white' }}>Comments ({data?.comments?.length})</Text>
                                    {
                                        data?.comments?.map((v, i) => {
                                            return <View style={styles.postmainc} key={i}>
                                                <View style={styles.postleftc}>
                                                    <Image source={{
                                                        uri: v?.postedBy?.profilePic
                                                    }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 99 }} />

                                                </View>
                                                <View style={styles.postrighc}>
                                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                                                        <Text style={{ marginTop: 5, fontSize: 15, fontFamily: 'Alegreya_700Bold',color:theme==='White'||theme===null?'black':'white'  }}>{v?.postedBy?.name}</Text>
                                                        <Text style={{ marginTop: 5, fontSize: 11, marginLeft: 5, color: 'grey', fontFamily: 'Alegreya_700Bold' }}>{v?.date}</Text>
                                                    </View>
                                                    <Text style={{color:theme==='White'||theme===null?'black':'whitesmoke' }}>{v?.text}</Text>



                                                </View>
                                            </View>
                                        })
                                    }

                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    {
                                        user?.profilePic ? <Image source={{
                                            uri: user?.profilePic
                                        }} style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 99 }} /> : null
                                    }
                                    <TextInput placeholder='comment' style={{ backgroundColor: '#FCFCFC', height: 40, flex: 1, paddingHorizontal: 10, borderRadius: 30, marginHorizontal: 5, fontSize: 17, fontFamily: 'Alegreya_700Bold' }} onChangeText={txet => setcomment(txet)} />

                                    <Icon1 name='send' color="#1D9BF0" size={25} onPress={() => dispatch(Comment({ text: comment, postId: data?._id }))} />
                                </View>
                            </View> : null
                    }

                </View>

            </View>

        </View>
    )
}

export default Posts

const styles = StyleSheet.create({
    postmain: {
        // display: 'flex',
        // flexDirection: 'row',
        marginVertical: 10,
        // borderBottomColor: 'grey',
        // borderBottomWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 17
    },
    postleft: {
        padding: 5
    },
    postright: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    postmainc: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        borderBottomColor: 'grey',
        // borderBottomWidth: 0.2,
        // paddingVertical: 5,paddingHorizontal:15
    },
    postleftc: {
        padding: 5
    },
    postrightc: {
        flex: 1
    }
})