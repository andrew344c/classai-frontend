import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import {
    IconButton,
    Avatar,
    ListItemText,
    Typography,
    Paper,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CalendarToday } from "@material-ui/icons";

import tempImg from "../../assets/default-user-300x300.png";
import LoadingBackdrop from "../LoadingBackdrop";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            username: "",
            description: "",
            dateJoined: "",
            loading: false,
            errors: false,
        };
    }

    componentDidMount() {
        axios
            .get(`/users/${this.props.match.params.username}`)
            .then((res) => {
                this.setState((oldState) => ({
                    ...oldState,
                    ...res.data,
                    loading: false,
                }));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response);
                    if (err.response.status === 404) {
                        this.setState((oldState) => ({
                            ...oldState,
                            loading: false,
                            errors: `The user ${this.props.match.params.username} does not exist.`,
                        }));
                    } else {
                        this.setState((oldState) => ({
                            ...oldState,
                            loading: false,
                            errors: `An unexpected error occurred. Please try again.`,
                        }));
                    }
                } else {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors:
                            "Failed to reach out to server. Please check your internet connection and try again.",
                    }));
                }
            });
        this.setState((oldState) => ({
            ...oldState,
            loading: true,
        }));
    }

    render() {
        const {
            firstName,
            lastName,
            username,
            description,
            dateJoined,
            loading,
            errors,
        } = this.state;

        if (loading) {
            return <LoadingBackdrop open={loading} />;
        } else if (errors) {
            return <Alert severity="error">{errors}</Alert>;
        }
        return (
            <Paper style={{ width: "80vw", margin: "3em auto" }}>
                <div class="row settings">
                    <div class="col-lg-4 col-12" style={{ marginTop: "20px" }}>
                        <h2>Profile</h2>
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
                        class="col-lg-8 col-12 align-items-center"
                        style={{ marginTop: "20px" }}
                    >
                        <h2>Description</h2>
                        <Typography
                            id="standard-multiline-flexible"
                            multiline
                            rows={10}
                            name="description"
                            onChange={this.onChange}
                            value={description}
                            fullWidth
                            style={{
                                border: "1px solid #d8d8d8",
                                padding: "0.5em",
                                marginBottom: "2em",
                                borderRadius: "10px",
                            }}
                        >
                            {description}
                        </Typography>
                        <Typography variant="h6">Date Joined</Typography>
                        <div style={{ paddingTop: "0.25em" }}>
                            <CalendarToday
                                style={{
                                    marginRight: "0.25em",
                                    paddingBottom: "4px",
                                }}
                                color="primary"
                            />{" "}
                            <span>
                                {`Joined ${dayjs(dateJoined).format(
                                    "MMMM DD, YYYY"
                                )}`}
                            </span>
                        </div>
                        {username === localStorage.getItem("username") ? (
                            <button
                                class="btn btn-primary btn-block"
                                style={{ margin: "2em auto" }}
                                onClick={() => {
                                    this.props.history.push("/Settings");
                                }}
                            >
                                Edit Profile
                            </button>
                        ) : null}
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withRouter(Profile);
