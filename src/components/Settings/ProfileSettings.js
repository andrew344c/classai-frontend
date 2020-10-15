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
} from "@material-ui/core";

export default class ProfileSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
        };
    }
    render() {
        const { username, firstName, lastName } = this.props;

        return (
            <div>
                <div class="row settings">
                    <div class="col-4" style={{ marginTop: "20px" }}>
                        <h2>Profile Picture</h2>
                        <div
                            class="d-flex align-items-center"
                            style={{ marginTop: "20px" }}
                        >
                            <Avatar
                                style={{
                                    width: "120px",
                                    height: "120px",
                                }}
                                src={tempImg}
                            />
                            <Typography style={{marginLeft: "0.6em"}}variant="h4">Andrew Chiang</Typography>
                        </div>
                    </div>
                    <div
                        class="col-8 d-flex align-items-center"
                        style={{ marginTop: "20px" }}
                    >
                        <div class="row">
                            <div class="col-12">
                                <h2>Names</h2>
                            </div>
                            <div class="col-6">
                                <TextField
                                    style={{
                                        width: "100%",
                                    }}
                                    id="standard-basic"
                                    label={firstName}
                                />
                            </div>
                            <div class="col-6">
                                <TextField
                                    style={{
                                        width: "100%",
                                    }}
                                    id="standard-basic"
                                    label={lastName}
                                />
                            </div>
                            <div class="col-12">
                                <TextField
                                    style={{
                                        width: "100%",
                                    }}
                                    id="standard-basic"
                                    label={username}
                                />
                            </div>
                            <div class="col-12">
                                <button
                                    class="btn btn-primary btn-block"
                                    style={{ marginTop: "30px" }}
                                >
                                    Submit Changes
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" style={{ marginTop: "50px" }}>
                        <h2>Description</h2>
                        <TextField
                            id="standard-multiline-flexible"
                            multiline
                            rows={10}
                            value="insert description here (no description variable yet"
                            style={{
                                width: "100%",
                                border: "1px solid #d8d8d8",
                                padding: "10px",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
