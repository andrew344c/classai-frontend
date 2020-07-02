import { GET_CLASSROOMS } from "../types";


const defaultState = {
    classrooms: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_CLASSROOMS:
            return {
                ...state,
                classrooms: action.payload
            }
        default:
            return state;
    }
}
