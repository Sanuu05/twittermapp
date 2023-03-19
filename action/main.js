import Axios from 'axios'
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS,GET_ITEMS_USER, REGISTER_FAIL,POSTED, UPDATED, GET_USER,GET_ITEMS, GET_MY_ITEMS, GET_FOLLOW_ITEMS, GET_ALL_USER, RESET} from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';
// const port = 'http://localhost:8080/main'
// const port = "http://192.168.29.31:8080/main"
const port ='https://careful-tan-polo-shirt.cyclic.app/main'





export const userSignup =(userdata)=>async(dispatch) =>{
    try {
        dispatch({type:REGISTER_FAIL,payload:''})
        // console.log('user',userdata)
        const {data} = await Axios.post(`${port}/register`,userdata)
        dispatch({type:REGISTER_SUCCESS,payload:data?true:false})
    } catch (error) {
        // console.log(error.response)
        dispatch({type:REGISTER_FAIL,payload:error.response.data})
        
    }

}

export const userLogin =(userdata)=>async(dispatch) =>{
    console.log(userdata)
    try {
        dispatch({type:REGISTER_FAIL,payload:''})
        const {data} = await Axios.post(`${port}/login`,userdata)
        // console.log('dd',data)
        dispatch({type:LOGIN_SUCCESS,payload:data})
        // window.location.href('/')
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:LOGIN_FAIL,payload:error.response.data})
        
    }

}

export const loadUser = () => async (dispatch, getState) => {
    try {
       console.log('load')
       dispatch({ type: POSTED, payload: "" })
        const token =await AsyncStorage.getItem('token')
        console.log('loadt',token)
        const { data } = await Axios.get(`${port}/load`, { headers: { "x-auth-token": token } })
        dispatch({ type: USER_LOADED, payload: data })



    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        // console.log('error',error.response)

    }
}


export const followUser = (userid) => async (dispatch, getState) => {
    try {  
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.put(`${port}/follow`,userid, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })
    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}

export const like = (postid) => async (dispatch) => {
    try {  
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.put(`${port}/like`,postid, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })
    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const unlike = (postid) => async (dispatch) => {
    try {  
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.put(`${port}/unlike`,postid, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })
    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const unfollowUser = (userid) => async (dispatch, getState) => {
    try {
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.put(`${port}/unfollow`,userid, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })
    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}
export const Delete = (id) => async (dispatch, getState) => {
    try {
        const token =await AsyncStorage.getItem('token')
        console.log(id)
        const { data } = await Axios.delete(`${port}/delete/${id}`, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })
    } catch (error) {
        // dispatch({ type: AUTH_ERROR })
        console.log(error)

    }
}

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${port}/getuser/${id}`)
        dispatch({ type: GET_USER, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}
export const getallUser = () => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${port}/allusers`)
        dispatch({ type: GET_ALL_USER, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}
export const GetPostByUser = (id) => async (dispatch) => {
    try {
        const { data } = await Axios.get(`${port}/userposts/${id}`)
        dispatch({ type: GET_ITEMS_USER, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}


export const postData = (postdata) => async (dispatch, getState) => {
    try {
        console.log('pos',postdata)
        const token =await AsyncStorage.getItem('token')
        
        const { data } = await Axios.post(`${port}/postdata`,postdata, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}

export const getpostData = (postdata) => async (dispatch, getState) => {
    try {
    
        
        const { data } = await Axios.get(`${port}/allposts`)
        dispatch({ type: GET_ITEMS, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })

    }
}

export const reset = (emaildata) => async (dispatch) => {
    try {
        dispatch({ type: RESET, payload: false })
        
        const { data } = await Axios.post(`${port}/reset`,emaildata)
        // console.log('reset',data)
        dispatch({ type: RESET, payload: data })

    } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data})

    }
}

export const getfollowData = () => async (dispatch, getState) => {
    try {
    
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.get(`${port}/followposts`, { headers: { "x-auth-token": token } })
        dispatch({ type:GET_FOLLOW_ITEMS, payload: data })
        dispatch({ type: POSTED, payload: "" })


    } catch (error) {
        dispatch({ type: AUTH_ERROR })
   

    }
}


export const getmytData = () => async (dispatch, getState) => {
    try {
    
        const token = await AsyncStorage.getItem('token')
        const { data } = await Axios.get(`${port}/myposts`, { headers: { "x-auth-token": token } })
        dispatch({ type: GET_MY_ITEMS, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}

export const Comment = (postdata) => async (dispatch, getState) => {
    try {
     console.log('vvv')
        const token =await AsyncStorage.getItem('token')
        const { data } = await Axios.put(`${port}/comment`,postdata, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })


    } catch (error) {
        // dispatch({ type: AUTH_ERROR })

    }
}
export const Updatedp = (postdata) => async (dispatch, getState) => {
    try {
      
        
        const token =await AsyncStorage.getItem('token')
  
        const { data } = await Axios.patch(`${port}/updatedp`,postdata, { headers: { "x-auth-token": token } })
        dispatch({ type: POSTED, payload: data })

    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}


export const Logout = (postdata) => async (dispatch, getState) => {
    try {

        dispatch({ type: LOGOUT_SUCESS })
        // window.location.reload()
        



    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log('error',error.response)

    }
}