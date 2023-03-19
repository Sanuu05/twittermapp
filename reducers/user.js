import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_PROFILE } from '../action/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: '',
    signin: false,
    error:''
}
const user= (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true

            }
        case USER_LOADED:
          
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case USER_PROFILE:
            return {
                ...state,
                isisAuthenticated: true,
                isLoading: false,
                user: action.payload
            }    
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', action.payload)
            // AsyncStorage.setItem('user', JSON.stringify(action.payload.user))
            return {
                ...state,
                token:action.payload,
                isAuthenticated: true,
                isLoading: false

            }
        case REGISTER_SUCCESS:
            
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                signin:true

            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCESS:
            AsyncStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                signin:false,
                error:action.payload
                
            }
        default:
            return state

    }
}
export default user;