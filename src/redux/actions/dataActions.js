import {
    GET_CLASSROOMS,
    GET_CLASSROOM,
    GET_SUBMISSIONS,
} from "../types";
import axios from "axios";

export const getClassrooms = () => (dispatch) => {
    return axios
        .get("/classrooms")
        .then((res) => {
            dispatch({
                type: GET_CLASSROOMS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

export const getClassroom = (classroomId, history) => (dispatch) => {
    return axios
        .get(`/classrooms/${classroomId}`)
        .then((res) => {
            dispatch({
                type: GET_CLASSROOM,
                payload: res.data,
            });
        })
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

