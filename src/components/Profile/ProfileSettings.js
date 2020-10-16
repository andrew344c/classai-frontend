import React, { Component } from "react";
import axios from "axios";

import "./Settings.css";

import tempImg from "../../assets/default-user-300x300.png";

import {
    Avatar,
    ListItem,
    ListItemText,
    Typography,
    Button,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListSubheader,
    DialogActions,
    Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LoadingBackdrop from "../LoadingBackdrop";

const propertyMapToName = {
    lastName: "Last Name",
    firstName: "First Name",
    description: "description",
};
const initialState = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    description: localStorage.getItem("description"),
    changes: [],
    dialogOpen: false,
    loading: false,
    errors: null,
    success: false,
};

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onChange = (event) => {
        event.persist();
        event.preventDefault();

        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.value,
        }));
    };

    onSubmit = () => {
        this.onErrorClose();
        let changes = [];
        for (const property in this.state) {
            if (
                property !== "changes" &&
                this.state[property] !== initialState[property]
            ) {
                changes.push(property);
            }
        }
        if (changes.length !== 0) {
            this.setState((oldState) => ({
                ...oldState,
                changes,
                dialogOpen: true,
            }));
        } else {
            this.setState((oldState) => ({
                ...oldState,
                errors: "There are no changes",
            }));
        }
    };

    confirmSubmit = () => {
        axios
            .post("/users/profile", this.state)
            .then((res) => {
                this.setState((oldState) => ({
                    ...oldState,
                    errors: null,
                    loading: false,
                    success: true,
                }));
                this.state.changes.forEach((property) => {
                    localStorage.setItem(property, this.state[property]);
                });
            })
            .catch((err) => {
                this.setState((oldState) => ({
                    ...oldState,
                    loading: false,
                    errors:
                        "An unexpected error occurred. Please try again later or contact us if this issue persists.",
                }));
            });
        this.setState((oldState) => ({
            ...oldState,
            loading: true,
            dialogOpen: false,
        }));
    };

    closeDialog = () => {
        this.setState((oldState) => ({
            ...oldState,
            dialogOpen: false,
        }));
    };

    onErrorClose = (event, reason) => {
        if (reason !== "clickaway") {
            this.setState((oldState) => ({
                ...oldState,
                errors: null,
            }));
        }
    };

    onSuccessClose = (event, reason) => {
        if (reason !== "clickaway") {
            this.setState((oldState) => ({
                ...oldState,
                success: false,
            }));
        }
    };

    render() {
        const username = localStorage.getItem("username");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");

        return (
            <div>
                <LoadingBackdrop open={this.state.loading} />
                <Snackbar
                    open={this.state.errors !== null}
                    autoHideDuration={10000}
                    onClose={this.onErrorClose}
                >
                    <Alert severity="error" onClose={this.onErrorClose}>
                        {this.state.errors}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={10000}
                    onClose={this.onSuccessClose}
                >
                    <Alert severity="success" onClose={this.onSuccessClose}>
                        Success in Changing Profile Information
                    </Alert>
                </Snackbar>
                <Dialog open={this.state.dialogOpen} onClose={this.closeDialog}>
                    <DialogTitle style={{ paddingBottom: 0 }}>
                        Confirm Changes
                    </DialogTitle>
                    <DialogContent>
                        <List
                            subheader={<ListSubheader>Changes</ListSubheader>}
                        >
                            {this.state.changes.map((property) => {
                                return (
                                    <ListItem
                                        style={{
                                            border: "1px",
                                            borderColor: "black",
                                            padding: "0 auto",
                                        }}
                                    >
                                        <Typography>{`Your ${propertyMapToName[property]} will be changed from "${initialState[property]}" to "${this.state[property]}".`}</Typography>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.confirmSubmit}
                            color="primary"
                            autoFocus
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <div class="row settings">
                    <div class="col-lg-4 col-12" style={{ marginTop: "20px" }}>
                        <h2>Profile Picture</h2>
                        <div
                            class="d-flex align-items-center"
                            style={{ marginTop: "20px" }}
                        >
                            <IconButton>
                                <Avatar
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                    }}
                                    src={tempImg}
                                />
                            </IconButton>
                            <ListItemText
                                style={{ paddingLeft: "2em" }}
                                primary={`${firstName} ${lastName}`}
                                secondary={username}
                                primaryTypographyProps={{ variant: "h5" }}
                            />
                        </div>
                    </div>
                    <div
                        class="col-lg-8 col-12 d-flex align-items-center"
                        style={{ marginTop: "20px" }}
                    >
                        <div class="row">
                            <div class="col-12">
                                <h2>Change Names</h2>
                            </div>
                            <div class="col-6">
                                <TextField
                                    style={{
                                        width: "100%",
                                    }}
                                    id="standard-basic"
                                    label="First Name"
                                    name="firstName"
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div class="col-6">
                                <TextField
                                    style={{
                                        width: "100%",
                                    }}
                                    id="standard-basic"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12" style={{ marginTop: "50px" }}>
                        <h2>Edit Description</h2>
                        <TextField
                            id="standard-multiline-flexible"
                            multiline
                            rows={10}
                            name="description"
                            onChange={this.onChange}
                            value={this.state.description}
                            fullWidth
                            style={{
                                border: "1px solid #d8d8d8",
                                padding: "10px",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <div class="col-12">
                        <button
                            class="btn btn-primary btn-block"
                            style={{ marginTop: "30px" }}
                            onClick={this.onSubmit}
                        >
                            Submit Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
