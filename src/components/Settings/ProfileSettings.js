import React, { Component } from "react";

import "./Settings.css";

import tempImg from "../../assets/default-user-300x300.png";

import {
    Avatar,
    Paper,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    ListItemIcon,
    Typography,
    Button,
    TextField,
    IconButton,
} from "@material-ui/core";

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            description: "",
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

    onSubmit = () => {
        console.log(this.state);
    };

    render() {
        const username = localStorage.getItem("username");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");

        return (
            <div>
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
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12" style={{ marginTop: "50px" }}>
                        <h2>Description</h2>
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
