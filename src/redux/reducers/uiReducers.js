import {
    TOGGLE_DRAWER,
    SET_ERRORS,
    CLEAR_ERRORS,
    ADD_EXTENSION,
    REMOVE_EXTENSION,
} from "../types";

const defaultState = {
    drawerOpen: false,
    errors: null,
    extensions: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: !state.drawerOpen,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload.error,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            };
        case ADD_EXTENSION:
            return {
                ...state,
                extensions: state.extensions.concat([action.extension]),
            };
        case REMOVE_EXTENSION:
            return {
                ...state,
                extensions: state.extensions.filter(
                    (extension) => extension !== action.extension
                ),
            };
        default:
            return state;
    }
};
