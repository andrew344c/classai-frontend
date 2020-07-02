import { GET_CLASSROOMS, JOINED_CLASSROOM } from "../types";

const defaultState = {
    classrooms: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_CLASSROOMS:
            return {
                ...state,
                classrooms: action.payload.classrooms,
            };
        case JOINED_CLASSROOM:
            console.log([...state.classrooms, action.newClassroom]);
            return {
                ...state,
                classrooms: [...state.classrooms, action.newClassroom],
            };
        default:
            return state;
    }
};
