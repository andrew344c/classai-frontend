import { SET_ERRORS } from "../types"
import axios from "axios"


export const login = (userData, history) => (dispatch) => {
    console.log("login action!");
    axios.post("/users/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            console.log(res.data.JWToken);
            history.push("/");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signup = (userData, history) => (dispatch) => {
    console.log(userData);
    axios.post("users/signup", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            console.log(res.data.JWToken);
            history.push("/");
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

const setAuthorizationHeader = (jwtoken) => {
    const JWToken = `Bearer ${jwtoken}`;
    localStorage.setItem("JWToken", JWToken);
    axios.defaults.headers.common["Authorization"] = JWToken;
}