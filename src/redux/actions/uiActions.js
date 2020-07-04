import { TOGGLE_DRAWER } from "../types"


export const toggleDrawer = () => (dispatch) => {
    dispatch({
        type: TOGGLE_DRAWER,
    });

}
