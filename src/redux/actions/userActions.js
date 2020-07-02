import { SET_ERRORS, SET_AUTHENTICATED } from "../types";
import axios from "axios";

export const login = (userData, history) => (dispatch) => {
    axios
        .post("/users/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            dispatch({
                type: SET_AUTHENTICATED,
                payload: true,
            });
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const signup = (userData, history) => (dispatch) => {
    axios
        .post("/users/signup", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            dispatch({
                type: SET_AUTHENTICATED,
                payload: true,
            });
            history.push("/");
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const logout = (history) => (dispatch) => {
    axios
        .post("/users/logout")
        .then((res) => {
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("JWToken");
            dispatch({
                type: SET_AUTHENTICATED,
                payload: false,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const setAuthorizationHeader = (jwtoken) => {
    const JWToken = `Bearer ${jwtoken}`;
    localStorage.setItem("JWToken", JWToken);
    axios.defaults.headers.common["Authorization"] = JWToken;
};
