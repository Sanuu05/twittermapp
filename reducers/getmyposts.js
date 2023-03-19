import {GET_MY_ITEMS} from '../action/types'


const initial ={
    user:[]
}
 const getmyposts =(state=initial,action)=>{
    switch(action.type){
        case GET_MY_ITEMS:
            return{
                user:action.payload

            }
        default:
            return state    
    }
}

export default getmyposts