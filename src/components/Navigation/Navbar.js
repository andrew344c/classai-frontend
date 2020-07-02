// React
import React, { Component, Fragment } from "react";

// React Router
import { Link } from "react-router-dom";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions/uiActions";
import { logout } from "../../redux/actions/userActions";

const styles = (theme) => ({
    appBar: {
        //backgroundColor: "#eeeeee",
        marginBottom: "4em",
    },
    title: {
        paddingLeft: "1em",
        color: "white",
    },
    leftmostRightGroupButton: {
        marginLeft: "auto",
        textDecoration: "none",
        color: "white"
    },
    link: {
        textDecoration: "none",
    },
});

class Navbar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton onClick={this.props.toggleDrawer} style={{color: "white"}}>
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography className={classes.title} variant="h6">
                            ClassAI
                        </Typography>
                    </Link>
                    {this.props.authenticated ? (
                        <Fragment>
                            <Link
                                to="/login"
                                className={classes.leftmostRightGroupButton}
                            >
                                Login
                            </Link>
                            <Link to="/signup" className={classes.link}>
                                Signup
                            </Link>
                        </Fragment>
                    ) : (
                        <Link
                            to="/login"
                            className={classes.leftmostRightGroupButton}
                            onClick={this.props.logout}
                        >
                            Logout
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    toggleDrawer,
    logout,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Navbar));
