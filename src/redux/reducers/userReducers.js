import { SET_AUTHENTICATED } from "../types";

const defaultState = {
    authenticated: false,
    userInfo: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            const { username, firstName, lastName } = action.payload;
            return {
                ...state,
                authenticated: action.payload.authVal,
                username,
                firstName,
                lastName,
            };
        default:
            return state;
    }
};
