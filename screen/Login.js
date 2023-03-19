import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { loadUser, reset, userLogin, userSignup } from '../action/main';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';

const Login = () => {
    const { width, height } = Dimensions.get('screen')
    const [forget, setforget] = useState(false)
    const [login, setlogin] = useState(true)
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const usertoken = useSelector(state => state.user.token)
    const error = useSelector(state => state.user.error)
    const signin = useSelector(state => state.user.signin)
    const resetres = useSelector(state => state.response.reset)
    const [active, setactive] = useState(true)
    console.log("ecr", error)
    const [data, setdata] = useState({
        name: '', email: '', password: '', cpassword: ''
    })
    const navigate = useNavigation()

    const postData = () => {
        // console.log('ii',data)
        dispatch(userLogin(data))


    }
    const submit = () => {

        dispatch(userSignup(data))
    }
    const forgetpass = (e) => {
        dispatch(reset({ email: data.email }))

    }
    useFocusEffect(
        React.useCallback(() => {
            dispatch(loadUser())
            if (user || usertoken) {
                navigate.navigate('Bottom')
            } else {
                navigate.navigate('Login')
            }
        }, [dispatch, usertoken, user])


    )
    useFocusEffect(
        React.useCallback(() => {

            if (signin) {
                Alert.alert('Signup Sucessfull')
                setlogin(true)
            } if (resetres) {
                Alert.alert('Reset Password has send to your register email id')
                setforget(false)
            }
        }, [resetres, signin])


    )
    useFocusEffect(
        React.useCallback(() => {

            if (error) {
                Alert.alert(error)
                
            } 
        }, [error])


    )
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    useFocusEffect(
        React.useCallback(() => {
            setactive(true)
            wait(4000).then(() => {
                setactive(false)
            });


        }, [dispatch])


    )
    if (active) {
        return <View style={{ height: height, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#32CCFE" />
        </View>

    } else {
        return (
            <SafeAreaView style={{
                flex: 1
            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    enabled={true}
                    style={{ flexGrow: 1 }} >
                    <View style={{ height: height - 50, backgroundColor: 'white', position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }} >
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 0, backgroundColor: 'white', flex: 1 }}>

                            {
                                login ? <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15 }}>
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/m1.png')} style={{ width: 150, height: undefined, aspectRatio: 1 }} />
                                    </View>

                                    <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_700Bold', fontSize: 25, color: 'orangered' }}>Welcome</Text>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium' }}>{forget ? "Reset Password" : 'Sign into your Account'} </Text>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium' }}>
                                        <Icon1 name='person-outline' size={25} color="orangered" />
                                        <TextInput placeholder='Email' value={data.email} style={{ flex: 1, marginLeft: 3 }} onChangeText={(text) => setdata({ ...data, email: text })} />
                                    </View>


                                    {
                                        forget ? null : <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium' }}>
                                            <Icon1 name='key-outline' size={25} color="orangered" />
                                            <TextInput placeholder='Password' value={data.password} secureTextEntry={true} style={{ flex: 1, marginLeft: 3 }} onChangeText={(text) => setdata({ ...data, password: text })} />
                                        </View>
                                    }

                                    {/* <PrimaryButton title="Login" onpress={submit} /> */}
                                    {
                                        forget ? <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                            <TouchableOpacity activeOpacity={0.8} onPress={forgetpass} >
                                                <View style={styles.btncontainer} >
                                                    <Text style={{ fontSize: 12, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Reset Password</Text>

                                                </View>
                                            </TouchableOpacity>


                                        </View> :

                                            loading ? <ActivityIndicator size="large" color="#32CCFE" /> :
                                                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                    <TouchableOpacity activeOpacity={0.8} onPress={postData} >
                                                        <View style={styles.btncontainer} >
                                                            <Text style={{ fontSize: 22, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Login</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                    }



                                </View> : <View style={{ backgroundColor: 'white', width: '85%', alignContent: 'center', paddingVertical: 20, borderRadius: 15 }}>
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../assets/m1.png')} style={{ width: 150, height: undefined, aspectRatio: 1 }} />
                                    </View>
                                    <Text style={{ textAlign: 'center', fontSize: 25, fontFamily: 'Alegreya_700Bold' }}>Hello</Text>
                                    <Text style={{ textAlign: 'center', fontFamily: 'Alegreya_500Medium' }}>SignUp your Account</Text>
                                    <TextInput placeholder='Name' value={data.name} style={{ paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium', marginLeft: 5 }} onChangeText={(text) => setdata({ ...data, name: text })} />
                                    <TextInput placeholder='Email' value={data.email} style={{ paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium', marginLeft: 5 }} onChangeText={(text) => setdata({ ...data, email: text })} />
                                    <TextInput placeholder='Password' value={data.password} secureTextEntry={true} style={{ paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium', marginLeft: 5 }} onChangeText={(text) => setdata({ ...data, password: text })} />
                                    <TextInput placeholder='Confirm Password' value={data.cpassword} style={{ paddingVertical: 10, paddingHorizontal: 7, marginHorizontal: 8, marginVertical: 7, backgroundColor: 'white', borderWidth: 1, borderColor: 'orangered', elevation: 0, borderRadius: 99, fontFamily: 'Alegreya_500Medium', marginLeft: 5 }} onChangeText={(text) => setdata({ ...data, cpassword: text })} />
                                    {/* <TextInput placeholder='Mobile' style={{ paddingVertical: 5, paddingHorizontal: 5, marginHorizontal: 8, marginVertical: 7, backgroundColor: '#DBDFE2', elevation: 0, borderRadius: 5, fontFamily: 'Alegreya_500Medium' }} onChangeText={(text) => setdata({ ...data, mobile: text })} /> */}
                                    {/* <PrimaryButton title="Signup" onpress={sign} /> */}
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity activeOpacity={0.8} onPress={submit} >
                                            <View style={styles.btncontainer} >
                                                <Text style={{ fontSize: 18, fontFamily: 'Alegreya_700Bold', color: 'white' }}>Signup</Text>

                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            {
                                forget ? <Text style={{ textAlign: 'center', marginTop: 1, fontFamily: 'Alegreya_400Regular', fontSize: 15 }}>Go back to Login page <Text onPress={() => setforget(false)} style={{ color: 'orangered', fontFamily: 'Alegreya_700Bold' }}>Click here</Text></Text> :
                                    <View>
                                        {
                                            login ? <Text style={{ textAlign: 'center', marginTop: 1, fontFamily: 'Alegreya_400Regular', fontSize: 15 }}>Forget Password? <Text onPress={() => setforget(true)} style={{ color: 'orangered', fontFamily: 'Alegreya_700Bold' }}>Reset</Text></Text> :
                                                null
                                        }
                                        {
                                            login ? <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Alegreya_700Bold', fontSize: 18 }}>Dont have an Account? <Text onPress={() => setlogin(false)} style={{ color: 'orangered' }}>Sign Up</Text></Text> :
                                                <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: 'Alegreya_700Bold', fontSize: 18 }}>Have an Account? <Text onPress={() => setlogin(true)} style={{ color: 'orangered' }}>Login</Text></Text>
                                        }

                                    </View>
                            }



                            {/* <Text onPress={() => navigation.navigate('Home')}>CLICK</Text> */}


                        </View>
                        <Toast/>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    btncontainer: {
        backgroundColor: 'orangered',
        height: 45,
        borderRadius: 30,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        paddingHorizontal: 40
    }
})