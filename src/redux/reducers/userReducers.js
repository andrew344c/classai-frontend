import { } from "../types";


const defaultState = {
    authenticated: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}