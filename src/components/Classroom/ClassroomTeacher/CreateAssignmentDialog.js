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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { connect } from "react-redux";
import { createAssignment } from "../../../redux/actions/userActions";
import LoadingBackdrop from "../../LoadingBackdrop";

const defaultState = {
    open: false,
    name: "",
    description: "",
    graded: false,
    hasDueDate: false,
    points: 0,
    dueDateMUI: "",
    gradedError: false,
    creatingAssignment: false,
    serverError: false,
    dueDate: null,
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
        }));
    };

    onSubmit = () => {
        this.setState((oldState) => ({
            ...oldState,
            creatingAssignment: true,
        }));
        this.props
            .createAssignment(this.state, this.props.classroomId)
            .catch(() => {
                this.setState((oldState) => ({
                    ...oldState,
                    creatingAssignment: false,
                    serverError: true,
                }));
            });
        this.setState(defaultState);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onClick}
                >
                    <AddIcon />
                    <Typography>Create an assignment</Typography>
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
                    </DialogContent>
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
});

const mapActionToProps = {
    createAssignment,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(CreateAssignmentDialog);
