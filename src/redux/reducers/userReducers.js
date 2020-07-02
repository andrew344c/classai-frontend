import { SET_AUTHENTICATED } from "../types";

const defaultState = {
    authenticated: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.payload.authVal,
            };
        default:
            return state;
    }
};
