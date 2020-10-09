import React, { Component } from "react";

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

// Redux
import { connect } from "react-redux";
import { login } from "../redux/actions/userActions";

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
    submit: {
        margin: theme.spacing(3, 0, 1),
    },
});

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
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

    onSubmit = (event) => {
        event.preventDefault();
        event.persist();
        this.props.login(this.state, this.props.history).then(() => {
            this.props.history.push("/");
        });
    };

    render() {
        const { classes, errors } = this.props;

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
                        Sign In
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.onChange}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.onSubmit}
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        {errors !== null ? (
                            <Typography
                                className={classes.error}
                                variant="body2"
                            >
                                {errors}
                            </Typography>
                        ) : null}
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.ui.errors,
});

const mapActionsToProps = {
    login,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Login));
