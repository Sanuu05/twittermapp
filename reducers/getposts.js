import { GET_ITEMS, GET_FOLLOW_ITEMS,GET_ITEMS_USER } from '../action/types'


const initial = {
    user: [],
    follow: [],
    peruser:[]
}
const getposts = (state = initial, action) => {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                user: action.payload

            }
        case GET_FOLLOW_ITEMS:
            return {
                ...state,
                follow: action.payload

            }
            case GET_ITEMS_USER:
            return {
                ...state,
                peruser: action.payload

            }
        default:
            return state
    }
}

export default getposts