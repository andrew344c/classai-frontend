import React, { Component } from "react";

import { connect } from "react-redux";
import {
    uploadSubmission,
    uploadSubmissionText,
} from "../../redux/actions/userActions";
import { getSubmissions } from "../../redux/actions/dataActions";

import {
    Dialog,
    Button,
    Paper,
    Typography,
    Grid,
    Tabs,
    Tab,
    AppBar,
    Box,
    TextareaAutosize,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
    paper: {
        marginBottom: 20,
        width: "100%",
    },
    img: {
        width: "100%",
        height: "auto",
    },
    textArea: {
        width: "100%",
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

class SubmitAssignmentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            tabValue: "file",
            textValue: "",
            textError: false,
            textSuccess: false,
        };
    }

    handleTabChange = (event, newValue) => {
        this.setState((oldState) => ({
            ...oldState,
            tabValue: newValue,
        }));
    };

    handleTextChange = (event, newValue) => {
        this.setState((oldState) => ({
            ...oldState,
            textValue: newValue,
        }));
    };

    onTextSubmit = () => {
        if (this.state.textValue === "") {
            this.setState((oldState) => ({
                ...oldState,
                textError: true,
            }));
        } else {
            this.props
                .uploadSubmissionText(
                    this.state.textValue,
                    this.props.classroomId,
                    this.props.assignmentId
                )
                .then(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        textError: false,
                        textSuccess: true,
                    }));
                })
                .catch((err) => {
                    this.setState((oldState) => ({
                        ...oldState,
                        textError: true,
                    }));
                });
        }
    };

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        document.getElementById("upload").innerHTML =
            "File: " + event.target.files[0].name;
    };

    onFileSubmit = () => {
        const formData = new FormData();
        if (this.state.selectedFile != null) {
            formData.append(
                "submission",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            this.props.uploadSubmission(
                formData,
                this.props.classroomId,
                this.props.assignmentId
            );
            document.getElementById("right").style.display = "flex";
            setTimeout(function () {
                document.getElementById("right").style.display = "none";
            }, 3000);
        } else {
            document.getElementById("notright").style.display = "flex";
            setTimeout(function () {
                document.getElementById("notright").style.display = "none";
            }, 3000);
        }
    };

    getSubmissions = () => {
        this.props.getSubmissions(
            this.props.classroomId,
            this.props.assignmentId
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <div
                style={{ width: "100%" }}
                open={this.props.open}
                onClose={this.props.onClickAway}
            >
                <div style={{ display: "none" }}>
                    <button onClick={this.getSubmissions}>
                        Get submissions
                    </button>
                    {this.props.submissions.map((submission) => {
                        console.log(submission);
                        return (
                            <Paper className={classes.paper}>
                                <Typography variant="h4">{`${submission.creator.firstName} ${submission.creator.lastName}`}</Typography>
                                <img
                                    src={submission.downloadUrl}
                                    key={submission.id}
                                    className={classes.img}
                                    alt="submission"
                                />
                                <Typography>{`Text Derived From OCR: ${submission.text}`}</Typography>
                                <Typography>{`Similar Websites to Submission: ${submission.plagarismLinks}`}</Typography>
                            </Paper>
                        );
                    })}
                    <form id="file-upload-form" className="uploader">
                        <input
                            id="file-upload"
                            type="file"
                            name="submission"
                            accept="image/*"
                            onChange={this.onFileChange}
                        />

                        <label htmlFor="file-upload" id="file-drag">
                            <div id="start">
                                <i
                                    className="fa fa-download"
                                    aria-hidden="true"
                                ></i>
                                <div>Select a file or drag here</div>
                                <div id="notimage" className="hidden">
                                    Please select an image
                                </div>
                                <span
                                    id="file-upload-btn"
                                    className="btn btn-primary"
                                >
                                    Select a file
                                </span>
                            </div>
                            <div id="response" className="hidden">
                                <div id="messages"></div>
                                <progress
                                    className="progress"
                                    id="file-progress"
                                    value="0"
                                >
                                    <span>0</span>%
                                </progress>
                            </div>
                        </label>
                        <Button onClick={this.onFileSubmit}>Submit</Button>
                    </form>
                </div>
                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.props.open}
                    onClose={this.props.onClickAway}
                    contentStyle={{ maxWidth: "100vw" }}
                >
                    <div
                        className={classes.root}
                        style={{
                            margin: 0,
                            padding: 0,
                            backgroundColor: "#e5e5e5",
                            padding: "5%",
                        }}
                    >
                        <div className={classes.root}>
                            <AppBar position="static">
                                <Tabs
                                    value={this.state.tabValue}
                                    onChange={this.handleTabChange}
                                    aria-label="Tabs"
                                >
                                    <Tab
                                        value="file"
                                        label="File Upload"
                                        wrapped
                                    />
                                    <Tab value="text" label="Text Upload" />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={this.state.tabValue} index="file">
                                <Alert
                                    id="notright"
                                    style={{ display: "none" }}
                                    variant="outlined"
                                    severity="error"
                                >
                                    Please upload a file before you submit
                                </Alert>
                                <Alert
                                    id="right"
                                    style={{ display: "none" }}
                                    variant="outlined"
                                    severity="success"
                                >
                                    Your file has been submitted
                                </Alert>
                                <Grid container spacing={3}>
                                    <Grid container item xs={12} spacing={3}>
                                        <Grid item xs={12}>
                                            <p
                                                style={{
                                                    textAlign: "center",
                                                    fontFamily: "Roboto",
                                                }}
                                            >
                                                <strong>
                                                    SUBMIT YOUR WORK HERE
                                                </strong>
                                            </p>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                id="upload"
                                                onClick={openDialog}
                                                variant="contained"
                                                color="primary"
                                                style={{ width: "100%" }}
                                            >
                                                + Upload Files
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                onClick={this.onFileSubmit}
                                                variant="contained"
                                                color="primary"
                                                style={{ width: "100%" }}
                                            >
                                                Submit
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} spacing={3}>
                                        {this.props.submissions.map(
                                            (submission) => {
                                                console.log(submission);
                                                return (
                                                    <Paper
                                                        className={
                                                            classes.paper
                                                        }
                                                    >
                                                        <Typography variant="h4">{`${submission.creator.firstName} ${submission.creator.lastName}`}</Typography>
                                                        <img
                                                            src={
                                                                submission.downloadUrl
                                                            }
                                                            key={submission.id}
                                                            className={
                                                                classes.img
                                                            }
                                                            alt="submission"
                                                        />
                                                        <Typography>{`Text Derived From OCR: ${submission.text}`}</Typography>
                                                        <Typography>{`Similar Websites to Submission: ${submission.plagarismLinks}`}</Typography>
                                                    </Paper>
                                                );
                                            }
                                        )}
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value={this.state.tabValue} index="text">

                                {this.state.textError ? (
                                    <Alert
                                        id="notright"
                                        variant="outlined"
                                        severity="error"
                                    >
                                        {this.state.textValue === ""
                                            ? "Your submission is empty"
                                            : "Something went wrong, please try again later"}
                                    </Alert>
                                ) : null}
                                {this.state.textSuccess ? (
                                    <Alert
                                        id="right"
                                        variant="outlined"
                                        severity="success"
                                    >
                                        Your text has been submitted
                                    </Alert>
                                ) : null}

                                <TextareaAutosize
                                    aria-label="Submission Text"
                                    rowsMin={30}
                                    colsMin={80}
                                    value={this.state.textValue}
                                    onChange={this.handleTextChange}
                                    class={classes.textArea}
                                    placeholder="Enter your submission here"
                                />

                                <Button
                                    onClick={this.onTextSubmit}
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%" }}
                                >
                                    Submit
                                </Button>
                            </TabPanel>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    classroomId: state.data.classroom.id,
    submissions: state.data.submissions,
});

const mapActionToProps = {
    uploadSubmission,
    uploadSubmissionText,
    getSubmissions,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(SubmitAssignmentDialog));

function openDialog() {
    document.getElementById("file-upload").click();
}
