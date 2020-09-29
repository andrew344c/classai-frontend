import {
    SET_ERRORS,
    SET_AUTHENTICATED,
    JOINED_CLASSROOM,
    CREATED_ASSIGNMENT,
    CLEAR_ERRORS,
    REDIRECT,
} from "../types";
import axios from "axios";

export const login = (userData, history) => (dispatch) => {
    axios
        .post("/users/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            dispatch({
                type: SET_AUTHENTICATED,
                payload: { authVal: true },
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
                payload: { authVal: true },
            });
            dispatch({
                type: CLEAR_ERRORS,
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

export const logout = (history) => (dispatch) => {
    axios
        .post("/users/logout")
        .then((res) => {
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("JWToken");
            dispatch({
                type: SET_AUTHENTICATED,
                payload: { authVal: false },
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const joinClassroom = (classroomId) => (dispatch) => {
    axios
        .post("/classrooms/join/" + classroomId.trim())
        .then((res) => {
            dispatch({
                type: JOINED_CLASSROOM,
                newClassroom: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const createClassroom = (classroomInfo) => (dispatch) => {
    axios.post("/classrooms/create", classroomInfo).then((res) => {
        dispatch({
            type: JOINED_CLASSROOM,
            newClassroom: res.data,
        });
    });
};

export const deleteClassroom = (classroomId) => (dispatch) => {
    axios
        .delete(`/classrooms/${classroomId}`)
        .then((res) => {
            alert(res.data.message);
            dispatch({ type: REDIRECT, newLocation: "/" });
        })
        .catch((err) => {
            alert(err.error);
        });
};

export const createAssignment = (assignmentInfo, classroomId) => (dispatch) => {
    axios
        .post(`/classrooms/${classroomId}/assignments`, assignmentInfo)
        .then((res) => {
            dispatch({
                type: CREATED_ASSIGNMENT,
                newAssignment: res.data,
            });
        });
};

export const uploadSubmission = (submissionData, classroomId, assignmentId) => (
    dispatch
) => {
    axios
        .post(
            `/classrooms/${classroomId}/submissions/${assignmentId}`,
            submissionData,
            {
                headers: {
                    "content-type": `multipart/form-data; boundary=${submissionData._boundary}`,
                },
            }
        )
        .then((res) => {
            console.log(res);
        });
};

export const uploadSubmissionText = (
    submissionText,
    classroomId,
    assignmentId
) => (dispatch) => {
    return axios.post(`/classrooms/${classroomId}/submissions/${assignmentId}`, {
        submissionText,
    });
};

const setAuthorizationHeader = (jwtoken) => {
    const JWToken = `Bearer ${jwtoken}`;
    localStorage.setItem("JWToken", JWToken);
    axios.defaults.headers.common["Authorization"] = JWToken;
};
