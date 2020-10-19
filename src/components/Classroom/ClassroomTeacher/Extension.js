import React, { Component, Fragment } from "react";

import { Typography, Button, Paper } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import CheckIcon from "@material-ui/icons/Check";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import {
    addExtension,
    removeExtension,
} from "../../../redux/actions/uiActions";

const styles = (theme) => ({
    extension: {
        width: "25em",
        height: "28em",
        marginRight: "2em",
        marginBottom: "2em",
    },
    extensionHalf: {
        height: "50%",
        width: "100%",
        //position: "relative",
    },
    extensionImg: {
        height: "100%",
        width: "100%",
    },
    divider: {
        margin: "2px auto",
    },
    extensionInfoContainer: {
        padding: "1em",
        position: "absolute",
        width: "25em"
    },
    subtitle: {
        color: "grey",
    },
    extensionFooter: {
        //position: "absolute",
        //bottom: 0,
        padding: "1em 1em 0 1em",
        position: "absolute",
        marginTop: "9em",
        width: "25em"
    },
    developmentStage: {
        display: "flex",
        float: "left",
    },
});

class Extension extends Component {
    render() {
        const {
            classes,
            imgSrc,
            name,
            subtitle,
            description,
            beta,
            added,
        } = this.props;
        return (
            <Paper className={classes.extension}>
                <div className={classes.extensionHalf}>
                    <img
                        className={classes.extensionImg}
                        src={imgSrc}
                        alt="Extension Background"
                    />
                </div>
                <div className={classes.extensionHalf}>
                    <div className={classes.extensionInfoContainer}>
                        <Typography variant="h6">{name}</Typography>
                        <Typography
                            variant="subtitle2"
                            className={classes.subtitle}
                        >
                            {subtitle}
                        </Typography>
                        <hr className={classes.divider} />
                        <Typography variant="body">{description}</Typography>
                    </div>
                    <div className={classes.extensionFooter}>
                        <div className={classes.developmentStage}>
                            {beta ? (
                                <Fragment>
                                    <BuildIcon
                                        style={{
                                            marginRight: "3px",
                                            paddingBottom: "3px",
                                        }}
                                    />
                                    <Typography variant="subtitle2">
                                        Beta
                                    </Typography>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <CheckIcon
                                        style={{
                                            marginRight: "3px",
                                            paddingBottom: "3px",
                                        }}
                                    />
                                    <Typography variant="subtitle2">
                                        Production
                                    </Typography>
                                </Fragment>
                            )}
                        </div>
                        {!added ? (
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ float: "right" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.addExtension(name);
                                }}
                            >
                                Add Extension
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{ float: "right" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.removeExtension(name);
                                }}
                            >
                                Remove Extension
                            </Button>
                        )}
                        <div style={{ clear: "both" }}></div>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default connect(null, { addExtension, removeExtension })(
    withStyles(styles)(Extension)
);
