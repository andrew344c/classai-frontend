import { GET_CLASSROOMS, JOINED_CLASSROOM, GET_CLASSROOM } from "../types";

const defaultState = {
    classrooms: [],
    classroomData: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_CLASSROOMS:
            return {
                ...state,
                classrooms: action.payload,
            };
        case JOINED_CLASSROOM:
            return {
                ...state,
                classrooms: [...state.classrooms, action.newClassroom],
            };
        case GET_CLASSROOM:
            return {
                ...state,
                classroom: action.payload,
            };
        default:
            return state;
    }
};
