import { TOGGLE_DRAWER, SET_ERRORS, CLEAR_ERRORS } from "../types"


const defaultState = {
    drawerOpen: false,
    errors: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen
            };
        case SET_ERRORS:
            console.log(action.payload);
            return {
                ...state,
                errors: action.payload.error
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state;
    }
}