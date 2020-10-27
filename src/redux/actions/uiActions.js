import {
    TOGGLE_DRAWER,
    ADD_EXTENSION,
    REMOVE_EXTENSION,
    SET_EXTENSIONS,
} from "../types";

export const toggleDrawer = () => (dispatch) => {
    dispatch({
        type: TOGGLE_DRAWER,
    });
};

export const addExtension = (extension) => (dispatch) => {
    dispatch({
        type: ADD_EXTENSION,
        extension,
    });
};

export const removeExtension = (extension) => (dispatch) => {
    dispatch({
        type: REMOVE_EXTENSION,
        extension,
    });
};

export const setExtensions = (extensions) => (dispatch) => {
    dispatch({
        type: SET_EXTENSIONS,
        extensions,
    });
};
