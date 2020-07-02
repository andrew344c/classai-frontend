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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { connect } from "react-redux";
import {
    joinClassroom,
    createClassroom,
} from "../../redux/actions/userActions";

class AddClassroomDialog extends Component {
    constructor() {
        super();
        this.state = {
            classroomId: "",
            classroomName: "",
            classroomDescription: "",
            open: false,
            joiningClassroom: true,
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
        this.onClickAway();
        if (this.state.joiningClassroom) {
            this.props.joinClassroom(this.state.classroomId);
        } else {
            this.props.createClassroom({
                name: this.state.classroomName,
                description: this.state.classroomDescription,
                teachers: [],
                students: [],
            });
        }
    };

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onClick}
                >
                    <AddIcon />
                    <Typography variant="body3">
                        Join or create a classroom
                    </Typography>
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
            </div>
        );
    }
}

const mapActionToProps = {
    joinClassroom,
    createClassroom,
};

export default connect(null, mapActionToProps)(AddClassroomDialog);
