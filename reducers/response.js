import { POSTED, RESET, UPDATED } from '../action/types'


const initial = {
    posted: '',
    updated: '',
    reset: false
    
}
const response = (state = initial, action) => {
    switch (action.type) {
        case POSTED:
            return {
                posted: action.payload

            }
        case UPDATED:
            return {
                updated: action.payload

            }
        case RESET:
            return {
                reset: action.payload

            }
        default:
            return state
    }
}

export default response