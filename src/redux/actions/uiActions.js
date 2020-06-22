import { TOGGLE_DRAWER, GET_UI_STATE } from "../types"


export const toggleDrawer = () => (dispatch) => {
    console.log("toggling action");
    dispatch({
        type: TOGGLE_DRAWER,
    });

}
