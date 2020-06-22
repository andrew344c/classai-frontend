import { TOGGLE_DRAWER } from "../types"


const defaultState = {
    drawerOpen: false
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case TOGGLE_DRAWER:
            console.log("toggling");
            return {
                ...state,
                drawerOpen: !state.drawerOpen
            };
        default:
            console.log("getting state");
            return state;
    }
}