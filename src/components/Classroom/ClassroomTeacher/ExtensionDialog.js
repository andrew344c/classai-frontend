import React, { Component } from "react";

import {
    Dialog,
    AppBar,
    Slide,
    Toolbar,
    IconButton,
    Typography,
    DialogContent,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

import Code from "../../../assets/code.jpg";
import OCR from "../../../assets/ocr.png";
import Plagiarism from "../../../assets/plagiarism.png";

import Extension from "./Extension";

import { connect } from "react-redux";

const styles = (theme) => ({
    appBar: {
        position: "relative",
        marginBottom: "4em",
    },
    title: {
        marginLeft: "2em",
        flex: 1,
    },
    extensionContainer: {
        display: "flex",
        flexWrap: "wrap",
        margin: "0 auto",
    },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class ExtensionDialog extends Component {
    render() {
        const { classes, handleClose, open, extensions } = this.props;
        console.log(extensions);
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Extensions
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className={classes.extensionContainer}>
                        <Extension
                            imgSrc={Code}
                            name="Code Runner"
                            subtitle="Targeted towards Computer Science classes"
                            description="Automatically run and grade student's
                                        code through containarized and secure
                                        environments"
                            beta={true}
                            added={extensions.includes("Code Runner")}
                        />
                        <Extension
                            imgSrc={OCR}
                            name="Image Reader"
                            subtitle="Targeted towards all classes"
                            description="Automatically reads students' image submissions and accurately translates them into text using an Optical Character Recognition algorithm"
                            beta={true}
                            added={extensions.includes("Image Reader")}
                        />
                        <Extension
                            imgSrc={Plagiarism}
                            name="Plagiarism Detection"
                            subtitle="Targeted towards all classes"
                            description="Cross references for plagiarism in students' submissions using a content similarity ML model with our index of educational websites"
                            beta={true}
                            added={extensions.includes("Plagiarism Detection")}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    extensions: state.ui.extensions,
});

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(ExtensionDialog));
