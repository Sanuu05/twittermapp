import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screen/Login';
import AppLoading from 'expo-app-loading';
import {Provider, useDispatch} from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import BottomNav from './screen/BottomNav';
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_500Medium,
  Alegreya_600SemiBold,
  Alegreya_700Bold,
  Alegreya_800ExtraBold,
  Alegreya_900Black,
  Alegreya_400Regular_Italic,
  Alegreya_500Medium_Italic,
  Alegreya_600SemiBold_Italic,
  Alegreya_700Bold_Italic,
  Alegreya_800ExtraBold_Italic,
  Alegreya_900Black_Italic,
} from '@expo-google-fonts/alegreya';
import CreatePost from './screen/CreatePost';
import Useraccount from './screen/Useraccount';
import Edit from './screen/Edit';

export default function App() {
  
  
  const Stack = createNativeStackNavigator();
  const store = createStore(reducers, compose(applyMiddleware(thunk)))
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_400Regular_Italic,
    Alegreya_500Medium,
    Alegreya_500Medium_Italic,
    Alegreya_700Bold,
    Alegreya_700Bold_Italic,
    Alegreya_800ExtraBold,
    Alegreya_800ExtraBold_Italic,
    Alegreya_900Black,
    Alegreya_900Black_Italic

  })
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login'component={Login} options={{
          headerShown:false
        }}  />
        <Stack.Screen name='Bottom' component={BottomNav} options={{
          headerShown:false
        }} />
        <Stack.Screen name='Create' component={CreatePost} options={{
          headerShown:false
        }} />
        <Stack.Screen name='Userdetail' component={Useraccount} options={{
          headerShown:false,
          title:'User'
        }} />
        <Stack.Screen name='Edit' component={Edit} options={{
          headerShown:false
        }} />
        
        {/* <Stack.Screen name="Bottom" component={Bottonav} options={{
          headerShown:false
        }} />
         <Stack.Screen name="Msg" component={Message} options={{
          headerShown:false
        }} /> */}
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
