import {
    SET_ERRORS,
    SET_AUTHENTICATED,
    JOINED_CLASSROOM,
    CREATED_ASSIGNMENT,
    CLEAR_ERRORS,
    CHANGE_CLASSROOM,
} from "../types";
import axios from "axios";

export const login = (userData, history) => (dispatch) => {
    return axios
        .post("/users/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.JWToken);
            setUserInfo(res.data);
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
            let userInfo = {
                ...res.data,
                authVal: true,
            };
            setAuthorizationHeader(res.data.JWToken);
            setUserInfo(res.data);
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

export const changeClassroomSettings = (classroomId, newClassroomSettings) => (
    dispatch
) => {
    return axios
        .put(`/classrooms/${classroomId}`, newClassroomSettings)
        .then((res) => {
            return dispatch({
                type: CHANGE_CLASSROOM,
                newClassroomSettings,
            });
        });
};

export const deleteClassroom = (classroomId) => (dispatch) => {
    return axios.delete(`/classrooms/${classroomId}`).then((res) => {
        alert(res.data.message);
    });
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
    return axios.post(
        `/classrooms/${classroomId}/submissions/${assignmentId}`,
        submissionData,
        {
            headers: {
                "content-type": `multipart/form-data; boundary=${submissionData._boundary}`,
            },
        }
    );
};

export const uploadSubmissionText = (
    submissionText,
    classroomId,
    assignmentId
) => (dispatch) => {
    console.log(submissionText);
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

const setUserInfo = (userInfo) => {
    const { username, firstName, lastName, description } = userInfo;
    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("description", description);
};
