import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import {
    Dialog,
    Button,
    DialogTitle,
    TextField,
    DialogContent,
    DialogActions,
    Typography,
    Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Settings, DeleteForever } from "@material-ui/icons";
import LoadingBackdrop from "../../LoadingBackdrop";

import { connect } from "react-redux";
import { changeClassroomSettings } from "../../../redux/actions/userActions";

class ClassroomSettingsDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: "",
            description: "",
            loading: false,
            success: false,
            errors: false,
            confirmDelete: false,
        };
    }

    onChange = (e) => {
        e.persist();

        this.setState((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    onSubmit = () => {
        this.props
            .changeClassroomSettings(this.props.classroom.id, {
                name: this.state.name,
                description: this.state.description,
            })
            .then(() => {
                this.setState((oldState) => ({
                    ...oldState,
                    loading: false,
                    success: true,
                    errors: false,
                }));
            })
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    if (err.response.status === 401) {
                        this.props.history.push("/login");
                    }
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors: err.response.data,
                    }));
                } else {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors:
                            "An unexpected error occured, please try again.",
                    }));
                }
            });
        this.setState((oldState) => ({
            ...oldState,
            loading: true,
        }));
    };

    onDelete = () => {
        if (!this.state.confirmDelete) {
            this.setState((oldState) => ({
                ...oldState,
                confirmDelete: true,
            }));
        } else {
            axios.delete(`/classrooms/${this.props.classroom.id}`).then(() => {
                this.props.history.push("/");
            });
        }
    };

    render() {
        const { buttonStyles } = this.props;
        return (
            <Fragment>
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={7000}
                    onClose={() =>
                        this.setState((oldState) => ({
                            ...oldState,
                            success: false,
                        }))
                    }
                >
                    <Alert
                        severity="success"
                        onClose={() =>
                            this.setState((oldState) => ({
                                ...oldState,
                                success: false,
                            }))
                        }
                    >
                        Successfully updated classroom settings
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.errors}
                    autoHideDuration={7000}
                    onClose={() =>
                        this.setState((oldState) => ({
                            ...oldState,
                            errors: false,
                        }))
                    }
                >
                    <Alert
                        severity="error"
                        onClose={() =>
                            this.setState((oldState) => ({
                                ...oldState,
                                errors: false,
                            }))
                        }
                    >
                        {this.state.errors}
                    </Alert>
                </Snackbar>

                <Button
                    variant="contained"
                    color="default"
                    className={buttonStyles}
                    startIcon={<Settings />}
                    onClick={() =>
                        this.setState((oldState) => ({
                            ...oldState,
                            open: true,
                        }))
                    }
                >
                    Classroom Settings
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={() =>
                        this.setState((oldState) => ({
                            ...oldState,
                            open: false,
                        }))
                    }
                    fullWidth
                >
                    <LoadingBackdrop open={this.state.loading} />
                    <DialogTitle>Settings</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            label="New Classroom Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            fullWidth
                            label="New Classroom Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.onDelete}
                        >
                            <DeleteForever />
                            <Typography>Delete Classroom</Typography>
                        </Button>
                        {this.state.confirmDelete ? (
                            <Typography variant="subtitle2" color="error">
                                Are you sure about this action? All data
                                regarding the classroom including grades will be
                                permanently deleted. Click the button again to
                                delete the classroom.
                            </Typography>
                        ) : null}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>
                                this.setState((oldState) => ({
                                    ...oldState,
                                    open: false,
                                }))
                            }
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    classroom: state.data.classroom,
});

const mapActionToProps = { changeClassroomSettings };

export default withRouter(
    connect(mapStateToProps, mapActionToProps)(ClassroomSettingsDialog)
);
