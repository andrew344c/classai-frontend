import React, { Component, Fragment } from "react";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = (theme) => ({
    top: {
        height: "10%",
        backgroundColor: "purple",
    },
    contents: {
        width: "80%",
        margin: "1em auto 0.5em auto",
    },
    divider: {
        marginTop: "0.25em",
        marginBottom: "0.5em",
    },
    deleteLater: {
        height:"70%"
    }
});

class ClassroomDescription extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Paper className={classes.top}></Paper>
                <Paper>
                    <div className={classes.contents}>
                        <Typography variant="h5">
                            Submissions
                        </Typography>
                        <Divider className={classes.divider} />
                        <div>
                            <Typography variant="body1">
                                Assignment: First Assignment
                            </Typography>
                            <Typography variant="body1">
                                Scripts Running: Plagarism
                            </Typography>
                            <p></p>
                            
                        </div>
                    </div>
                </Paper>
            </Fragment>
        );
    }
}

export default withStyles(styles)(ClassroomDescription);
