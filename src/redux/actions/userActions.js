import {
    SET_ERRORS,
    SET_AUTHENTICATED,
    JOINED_CLASSROOM,
    CREATED_ASSIGNMENT,
    CLEAR_ERRORS,
} from "../types";
import axios from "axios";

export const login = (userData, history) => (dispatch) => {
    return axios
        .post("/users/login", userData)
        .then((res) => {
            console.log(res.data.JWToken);
            setAuthorizationHeader(res.data.JWToken);
            let userInfo = {
                ...res.data,
                authVal: true,
            };
            dispatch({
                type: SET_AUTHENTICATED,
                payload: userInfo,
            });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
            throw err;
        });
};

export const signup = (userData, history) => (dispatch) => {
    return axios
        .post("/users/signup", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            let userInfo = {
                ...res.data,
                authVal: true,
            };
            dispatch({
                type: SET_AUTHENTICATED,
                payload: userInfo,
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
            throw err;
        });
};

export const logout = (history) => (dispatch) => {
    return axios
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
            throw err;
        });
};

export const joinClassroom = (classroomId) => (dispatch) => {
    return axios
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
    return axios.post("/classrooms/create", classroomInfo).then((res) => {
        dispatch({
            type: JOINED_CLASSROOM,
            newClassroom: res.data,
        });
    });
};

export const deleteClassroom = (classroomId) => (dispatch) => {
    return axios
        .delete(`/classrooms/${classroomId}`)
        .then((res) => {
            alert(res.data.message);
        })
};

export const createAssignment = (assignmentInfo, classroomId) => (dispatch) => {
    return axios
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
    return axios
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
    return axios.post(
        `/classrooms/${classroomId}/submissions/${assignmentId}`,
        {
            submissionText,
        }
    );
};

const setAuthorizationHeader = (jwtoken) => {
    const JWToken = `Bearer ${jwtoken}`;
    localStorage.setItem("JWToken", JWToken);
    axios.defaults.headers.common["Authorization"] = JWToken;
};
