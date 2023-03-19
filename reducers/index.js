import {combineReducers} from 'redux' 
import user from './user'
import getuser from './getuser'
import getposts from './getposts'
import getmyposts from './getmyposts'
import response from './response'

export default combineReducers({
    user,
    getuser,
    getposts,
    getmyposts,
    response
    

})