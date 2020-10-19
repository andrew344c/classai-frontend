import React, { Component, Fragment } from "react";

import dayjs from "dayjs";

// Material UI
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Typography,
    FormControlLabel,
    Switch,
    Snackbar,
    Paper,
    Chip,
    Avatar,
    IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

// Redux
import { connect } from "react-redux";
import { createAssignment } from "../../../redux/actions/userActions";
import { removeExtension } from "../../../redux/actions/uiActions";
import LoadingBackdrop from "../../LoadingBackdrop";
import { Alert } from "@material-ui/lab";
import ExtensionDialog from "./ExtensionDialog";

const defaultState = {
    open: false,
    extensionOpen: false,
    name: "",
    description: "",
    graded: false,
    hasDueDate: false,
    points: 0,
    dueDateMUI: "",
    testCases: [[null, null]],
    gradedError: false,
    creatingAssignment: false,
    submitErrors: false,
    dueDate: null,
    success: false,
    autoGrade: false,
};

class CreateAssignmentDialog extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    onChange = (event) => {
        event.persist();
        event.preventDefault();

        if (event.target.name === "dueDateMUI") {
            this.setState((oldState) => ({
                ...oldState,
                dueDate: new Date(event.target.value + ":00").toISOString(),
            }));
        } else if (event.target.name === "points") {
            let pointsNum = event.target.value;
            if (isNaN(parseFloat(pointsNum)) || parseFloat(pointsNum) < 0) {
                return this.setState((oldState) => ({
                    ...oldState,
                    [event.target.name]: event.target.value,
                    gradedError: true,
                }));
            }
        }
        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.value,
            gradedError: false,
        }));
    };

    onSwitch = (event) => {
        event.persist();
        event.preventDefault();

        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.checked,
        }));
    };

    onClick = () => {
        this.setState((oldState) => ({
            ...oldState,
            open: !oldState.open,
        }));
    };

    onClickAway = () => {
        this.setState((oldState) => ({
            ...oldState,
            open: false,
            extensionOpen: false,
        }));
    };

    openExtensionDialog = () => {
        this.setState((oldState) => ({
            ...oldState,
            extensionOpen: true,
        }));
    };

    closeExtensionDialog = () => {
        this.setState((oldState) => ({
            ...oldState,
            extensionOpen: false,
        }));
    };

    onSubmit = () => {
        if (this.state.name === "") {
            this.setState((oldState) => ({
                ...oldState,
                submitErrors: "The assignment name cannot be empty",
            }));
        } else if (this.state.gradedError) {
            this.setState((oldState) => ({
                ...oldState,
                submitErrors: "Only positive point totals are allowed",
            }));
        } else {
            this.setState((oldState) => ({
                ...oldState,
                creatingAssignment: true,
            }));
            this.props
                .createAssignment(
                    { ...this.state, extensions: this.props.extensions },
                    this.props.classroomId
                )
                .then(() => {
                    this.setState({ ...defaultState, success: true });
                })
                .catch(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        creatingAssignment: false,
                        submitErrors:
                            "An unexpected error occurred. Please try again later or contact us if this error persists",
                    }));
                });
        }
    };

    onCloseError = (event, reason) => {
        if (reason !== "clickaway") {
            this.setState((oldState) => ({
                ...oldState,
                submitErrors: false,
            }));
        }
    };

    onCloseSuccess = (event, reason) => {
        if (reason !== "clickaway") {
            this.setState((oldState) => ({
                ...oldState,
                success: false,
            }));
        }
    };

    onTestCaseChange = (event, index) => {
        event.preventDefault();
        event.persist();

        this.setState((oldState) => {
            if (event.target.name === "stdin") {
                oldState.testCases[index][0] = event.target.value;
            } else {
                oldState.testCases[index][1] = event.target.value;
            }
            return oldState;
        });
    };

    addTestCase = (event) => {
        event.preventDefault();
        event.persist();

        this.setState((oldState) => ({
            ...oldState,
            testCases: oldState.testCases.concat([[null, null]]),
        }));
    };

    removeTestCase = (event, index) => {
        event.preventDefault();
        event.persist();

        this.setState((oldState) => ({
            ...oldState,
            testCases: oldState.testCases
                .slice(0, index)
                .concat(
                    oldState.testCases.slice(
                        index + 1,
                        oldState.testCases.length
                    )
                ),
        }));
    };

    render() {
        const { classes, extensions } = this.props;

        return (
            <div>
                <Snackbar
                    open={this.state.submitErrors}
                    autoHideDuration={10000}
                    onClose={this.onCloseError}
                >
                    <Alert severity="error" onClose={this.onCloseError}>
                        {this.state.submitErrors}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={10000}
                    onClose={this.onCloseSuccess}
                >
                    <Alert severity="success" onClose={this.onCloseSuccess}>
                        Successfully created a new assignment
                    </Alert>
                </Snackbar>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onClick}
                >
                    <AddIcon style={{ paddingBottom: "2px" }} />
                    <Typography style={{ marginLeft: "5px" }}>
                        Create an assignment
                    </Typography>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClickAway}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create an assignment
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create an assignment, please enter a name and
                            description for the assignment.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Assignment Name"
                            type="name"
                            name="name"
                            onChange={this.onChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            label="Assignment Description"
                            name="description"
                            onChange={this.onChange}
                            fullWidth
                        />
                        {this.state.hasDueDate ? (
                            <TextField
                                id="datetime-local"
                                label="Due Date"
                                name="dueDateMUI"
                                type="datetime-local"
                                style={{ marginTop: "1em" }}
                                defaultValue=""
                                onChange={this.onChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        ) : null}
                        {this.state.graded ? (
                            <TextField
                                autoFocus
                                error={this.state.gradedError}
                                margin="dense"
                                label="Points"
                                name="points"
                                value={this.state.points}
                                helperText={
                                    this.state.gradedError
                                        ? "Only positive numbers allowed"
                                        : ""
                                }
                                onChange={this.onChange}
                            />
                        ) : null}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.hasDueDate}
                                    onChange={this.onSwitch}
                                    name="hasDueDate"
                                    color="primary"
                                />
                            }
                            label="Due Date"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.graded}
                                    onChange={this.onSwitch}
                                    name="graded"
                                    color="primary"
                                />
                            }
                            label="Graded Assignment"
                        />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.openExtensionDialog}
                            style={{ width: "12em", marginTop: "4px" }}
                        >
                            Add Extension
                        </Button>
                        <hr />
                        {extensions.map((extension) => {
                            return (
                                <Chip
                                    size="small"
                                    label={extension}
                                    avatar={
                                        <Avatar>{extension.charAt(0)}</Avatar>
                                    }
                                    color="primary"
                                    onDelete={() => {
                                        this.props.removeExtension(extension);
                                    }}
                                />
                            );
                        })}
                        {extensions.includes("Code Runner") ? (
                            <Paper
                                style={{
                                    marginTop: "3em",
                                    padding: "1em",
                                }}
                            >
                                <Typography variant="h5">
                                    Code Runner (BETA)
                                </Typography>
                                <hr />
                                <Typography
                                    variant="body2"
                                    style={{ marginBottom: "1em" }}
                                >
                                    Code Runner currently supports running C,
                                    C++, Node, and Python code. It will compile
                                    (if neccesary for language) and run the
                                    student's submission file (only 1 file
                                    allowed; for C++ it will run the main
                                    function). You are able to set test cases
                                    below by providing a stdin value and
                                    corresponding stdout value. For each test
                                    case, stdout and stderr will be reported
                                    back, and you may select autograding (where
                                    grade would be # correct / # total) or
                                    manual grading. Also you are able to choose
                                    the amount of submissions allowed. Our
                                    extension currently is still in development
                                    and is restricted in flexability, but we are
                                    rapidly expanding to include more languages,
                                    and increased flexibility and customization
                                    for testing and grading.
                                </Typography>
                                {this.state.testCases.map((testCase, index) => {
                                    console.log(testCase);
                                    return (
                                        <div>
                                            <Typography variant="h6">
                                                Test Case {index + 1}
                                            </Typography>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                label="Stdin"
                                                name="stdin"
                                                itemID={index}
                                                key={index}
                                                value={testCase[0]}
                                                onChange={(event) =>
                                                    this.onTestCaseChange(
                                                        event,
                                                        index
                                                    )
                                                }
                                                style={{ marginRight: "5px" }}
                                            />
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                label="Expected Stdout"
                                                name="stdout"
                                                itemID={index}
                                                key={index}
                                                value={testCase[1]}
                                                onChange={(event) =>
                                                    this.onTestCaseChange(
                                                        event,
                                                        index
                                                    )
                                                }
                                            />
                                            <IconButton
                                                onClick={(e) =>
                                                    this.removeTestCase(
                                                        e,
                                                        index
                                                    )
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                            <hr />
                                        </div>
                                    );
                                })}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.addTestCase}
                                >
                                    Add Test Case
                                </Button>
                                <br />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="autoGrade"
                                            onChange={this.onSwitch}
                                            checked={this.state.autoGrade}
                                            color="primary"
                                        />
                                    }
                                    label="Auto Grade"
                                />
                            </Paper>
                        ) : null}
                    </DialogContent>
                    <ExtensionDialog
                        open={this.state.extensionOpen}
                        handleClose={this.closeExtensionDialog}
                    />
                    <DialogActions>
                        <Button onClick={this.onClickAway} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
                <LoadingBackdrop open={this.state.creatingAssignment} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    classroomId: state.data.classroom.id,
    extensions: state.ui.extensions,
});

const mapActionToProps = {
    createAssignment,
    removeExtension,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(CreateAssignmentDialog);
