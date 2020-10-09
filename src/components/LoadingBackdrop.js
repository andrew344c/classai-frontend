import React, { Component } from "react";

import { Backdrop, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
    backdrop: {
        color: "fff",
        //backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 999,
    },
    loading: {
        margin: "0 auto",
    },
});

class LoadingBackdrop extends Component {
    render() {
        const { classes, open } = this.props;
        return (
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress className={classes.loading} />
                </Backdrop>
            </div>
        );
    }
}

export default withStyles(styles)(LoadingBackdrop);
