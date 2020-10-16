import React, { Component, Fragment } from "react";

// Material UI
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Snackbar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { connect } from "react-redux";
import {
    joinClassroom,
    createClassroom,
} from "../../redux/actions/userActions";
import LoadingBackdrop from "../LoadingBackdrop";
import { Alert } from "@material-ui/lab";

class AddClassroomDialog extends Component {
    constructor() {
        super();
        this.state = {
            classroomId: "",
            classroomName: "",
            classroomDescription: "",
            open: false,
            joiningClassroom: true,
            loading: false,
            errors: false,
            success: false,
        };
    }

    onChange = (event) => {
        event.persist();
        event.preventDefault();
        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.value,
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
        }));
    };

    isJoiningClassroom = () => {
        this.setState((oldState) => ({
            ...oldState,
            joiningClassroom: true,
        }));
    };

    isCreatingClassroom = () => {
        this.setState((oldState) => ({
            ...oldState,
            joiningClassroom: false,
        }));
    };

    onSubmit = () => {
        if (
            this.state.classroomName === "" ||
            this.state.classroomDescription === ""
        ) {
            this.setState((oldState) => ({
                ...oldState,
                errors: "The classroom name and description cannot be blank",
            }));
            return;
        }
        if (this.state.joiningClassroom) {
            this.props
                .joinClassroom(this.state.classroomId)
                .then(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors: false,
                        success: "Successfully joined classroom",
                    }));
                    this.onClickAway();
                })
                .catch(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors: "Classroom not found",
                    }));
                });
        } else {
            this.props
                .createClassroom({
                    name: this.state.classroomName,
                    description: this.state.classroomDescription,
                    teachers: [],
                    students: [],
                })
                .then(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors: false,
                        success: "Successfully created classroom",
                    }));
                    this.onClickAway();
                })
                .catch(() => {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors:
                            "Something went wrong while creating the classroom, please try again.",
                    }));
                });
        }

        this.setState((oldState) => ({
            ...oldState,
            loading: true,
        }));
    };

    onCloseError = (event, reason) => {
        if (reason !== "clickaway") {
            this.setState((oldState) => ({
                ...oldState,
                errors: false,
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

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.errors}
                    autoHideDuration={10000}
                    onClose={this.onCloseError}
                >
                    <Alert severity="error" onClose={this.onCloseError}>
                        {this.state.errors}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={10000}
                    onClose={this.onCloseSuccess}
                >
                    <Alert severity="success" onClose={this.onCloseSuccess}>
                        {this.state.success}
                    </Alert>
                </Snackbar>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onClick}
                >
                    <AddIcon />
                    <Typography>Join or create a classroom</Typography>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClickAway}
                    aria-labelledby="form-dialog-title"
                >
                    <Button
                        onClick={this.isJoiningClassroom}
                        name="joiningClass"
                    >
                        <Typography>Join Class</Typography>
                    </Button>
                    <Button
                        onClick={this.isCreatingClassroom}
                        name="creatingClass"
                    >
                        <Typography>Create Class</Typography>
                    </Button>
                    {this.state.joiningClassroom ? (
                        <Fragment>
                            <DialogTitle id="form-dialog-title">
                                Join Class
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To join a classroom, please enter the
                                    classroom id.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="classroomId"
                                    label="Classroom Id"
                                    type="classroomId"
                                    name="classroomId"
                                    onChange={this.onChange}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={this.onClickAway}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button onClick={this.onSubmit} color="primary">
                                    Join
                                </Button>
                            </DialogActions>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <DialogTitle id="form-dialog-title">
                                Create Class
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To create a classroom, please enter a name
                                    and description for the class.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="classroomName"
                                    label="Classroom Name"
                                    type="classroomName"
                                    name="classroomName"
                                    onChange={this.onChange}
                                    fullWidth
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Classroom Description"
                                    name="classroomDescription"
                                    onChange={this.onChange}
                                    multiline
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={this.onClickAway}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button onClick={this.onSubmit} color="primary">
                                    Create
                                </Button>
                            </DialogActions>
                        </Fragment>
                    )}
                </Dialog>
                <LoadingBackdrop open={this.state.loading} />
            </div>
        );
    }
}

const mapActionToProps = {
    joinClassroom,
    createClassroom,
};

export default connect(null, mapActionToProps)(AddClassroomDialog);
