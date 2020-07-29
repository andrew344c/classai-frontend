import {
    SET_ERRORS,
    SET_AUTHENTICATED,
    JOINED_CLASSROOM,
    CREATED_ASSIGNMENT,
    CLEAR_ERRORS,
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
    console.log(submissionData);
    console.log("GOOOO")
    for(var pair of submissionData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }
    axios
        .post(
            `/classrooms/${classroomId}/assignments/${assignmentId}/submissions`,
            submissionData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then((res) => {
            dispatch({});
        });
};

const setAuthorizationHeader = (jwtoken) => {
    const JWToken = `Bearer ${jwtoken}`;
    localStorage.setItem("JWToken", JWToken);
    axios.defaults.headers.common["Authorization"] = JWToken;
};
