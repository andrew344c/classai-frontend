import { GET_CLASSROOMS, GET_CLASSROOM } from "../types";
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
            console.error(err);
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
            console.error(err);
        });
};
