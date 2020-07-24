import {
    GET_CLASSROOMS,
    GET_CLASSROOM,
    REDIRECT,
    CLEAR_REDIRECT,
} from "../types";
import axios from "axios";

export const getClassrooms = () => (dispatch) => {
    axios
        .get("/classrooms")
        .then((res) => {
            dispatch({
                type: GET_CLASSROOMS,
                payload: res.data,
            });
        })
        .catch((err) => {
            //pushHistory("/login");
            dispatch({
                type: REDIRECT,
                newLocation: "/login",
            });
        });
};

export const getClassroom = (classroomId, history) => (dispatch) => {
    console.log("get classroom");
    axios
        .get(`/classrooms/${classroomId}`)
        .then((res) => {
            dispatch({
                type: GET_CLASSROOM,
                payload: res.data,
            });
        })
        .catch((err) => {
            //pushHistory("/login");
            dispatch({
                type: REDIRECT,
                newLocation: "/login",
            });
        });
};

export const clearRedirect = () => (dispatch) => {
    dispatch({
        type: CLEAR_REDIRECT,
    });
};
