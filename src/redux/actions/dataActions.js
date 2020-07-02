import { GET_CLASSROOMS } from "../types";
import axios from "axios";

export const getClassrooms = () => (dispatch) => {
    console.log("action");
    axios
        .get("/classrooms")
        .then((res) => {
            console.log("action2");
            dispatch({
                type: GET_CLASSROOMS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log("arr");
            console.error(err);
        });
};

export const getClassroom = (classroomId) => (dispatch) => {
    axios.get(`/classrooms/${classroomId}`);
};
