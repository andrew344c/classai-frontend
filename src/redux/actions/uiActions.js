import { TOGGLE_DRAWER } from "../types"


export const toggleDrawer = () => (dispatch) => {
    console.log("toggling action");
    dispatch({
        type: TOGGLE_DRAWER,
    });

}
