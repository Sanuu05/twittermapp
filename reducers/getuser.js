import { GET_ALL_USER, GET_USER } from '../action/types'


const initial = {
    user: [],
    alluser: []
}
const getuser = (state = initial, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload

            }
        case GET_ALL_USER:
            return {
                ...state,
               alluser: action.payload

            }
        default:
            return state
    }
}

export default getuser