import React, { Component, Fragment } from "react";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../assets/logo.png";

import firebase from "../Firebase";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Nexus
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

let auth = firebase.auth();

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: "100px",
        height: "100px",
    },
    form: {
        textAlign: "center",
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    error: {
        color: "red",
        marginBottom: "0.2em",
    },
    success: {
        color: "green",
        marginBottom: "0.2em",
    },
    submit: {
        marginTop: "1em",
    },
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            reset: false,
            errors: "",
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

    sendResetEmail = (event) => {
        event.preventDefault();
        event.persist();
        auth.sendPasswordResetEmail(this.state.email)
            .then(() => {
                this.setState((oldState) => ({
                    ...oldState,
                    errors: false,
                    reset: true,
                }));
            })
            .catch((err) => {
                this.setState((oldState) => ({
                    ...oldState,
                    errors: "Email is not recognized",
                }));
            });
    };

    render() {
        const { classes } = this.props;
        const { errors, reset } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <img
                        src={Logo}
                        alt="Nexus Logo"
                        style={{ width: "100px", marginBottom: "1em" }}
                    />
                    <Typography component="h1" variant="h4">
                        Reset Password
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={this.onSubmit}
                        noValidate
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.onChange}
                            autoComplete="email"
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.sendResetEmail}
                            className={classes.submit}
                        >
                            Send Reset Password Email
                        </Button>
                        {errors !== null ? (
                            <Typography
                                className={classes.error}
                                variant="body2"
                            >
                                {errors}
                            </Typography>
                        ) : null}
                        {reset ? (
                            <Typography className={classes.success} variant="body2">
                                An email from nexusedu.app will be sent to your
                                email at {this.state.email}. If you have not
                                received this email in an hour, please try again
                                or contact us if this issues continues.
                            </Typography>
                        ) : null}
                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Back to Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>{" "}
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(Login);
