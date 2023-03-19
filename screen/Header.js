import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = (params) => {
  return (
    <View style={{ paddingHorizontal: 10, borderBottomColor: '#CDCFCF', borderBottomWidth: 0.8 }}>
      {
        params?.title ?

         <Text style={{color:params?.theme==='White'||params?.theme===null?'black':'white', fontSize: params?.center ? 20 : 28, fontFamily: 'Alegreya_700Bold', letterSpacing: 1.2, marginLeft: 5, textAlign: params?.center ? 'center' : 'left' }}>{params?.title}</Text> :
          <Image source={require('../assets/logo.png')} style={{ width: 55, height: undefined, aspectRatio: 1, resizeMode: 'contain' }} />
        // <Text style={{fontSize: 25, fontFamily:'Alegreya_700Bold',letterSpacing:1.5,color:'orangered'}}>BLO<Text style={{fontSize: 25, fontFamily: 'Alegreya_700Bold',letterSpacing:1.5,textDecorationLine:'line-through'}}>GY</Text></Text>
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})