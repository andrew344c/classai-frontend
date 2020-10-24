import {
    GET_CLASSROOMS,
    JOINED_CLASSROOM,
    GET_CLASSROOM,
    CREATED_ASSIGNMENT,
    GET_SUBMISSIONS,
    CHANGE_CLASSROOM,
} from "../types";

const defaultState = {
    classrooms: [],
    classroom: {},
    submissions: [],
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
        case CREATED_ASSIGNMENT:
            return {
                ...state,
                classroom: {
                    ...state.classroom,
                    assignments: [
                        action.newAssignment,
                        ...state.classroom.assignments,
                    ],
                },
            };
        case GET_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload.submissions,
            };
        case CHANGE_CLASSROOM:
            return {
                ...state,
                classroom: {
                    ...state.classroom,
                    ...action.newClassroomSettings,
                },
            };
        default:
            return state;
    }
};
