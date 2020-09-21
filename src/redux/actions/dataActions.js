import {
    GET_CLASSROOMS,
    GET_CLASSROOM,
    REDIRECT,
    CLEAR_REDIRECT,
    GET_SUBMISSIONS,
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

export const getSubmissions = (classroomId, assignmentId) => (dispatch) => {
    return axios
        .get(
            `/classrooms/${classroomId}/submissions/${assignmentId}`
        )
        .then((res) => {
            dispatch({
                type: GET_SUBMISSIONS,
                payload: res.data
            })
        });
};

export const clearRedirect = () => (dispatch) => {
    dispatch({
        type: CLEAR_REDIRECT,
    });
};
