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
    console.log("getting classroom")
    console.log("id: " + classroomId)
    axios
        .get(`/classrooms/${classroomId}`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: GET_CLASSROOM,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.error(err);
        });
};
