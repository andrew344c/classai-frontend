// React
import React, { Component, Fragment } from "react";

// React Router
import { Link } from "react-router-dom";

// Material UI
import MenuIcon from "@material-ui/icons/Menu";
import {
    Toolbar,
    Avatar,
    Popover,
    Card,
    AppBar,
    IconButton,
    Button,
    Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions/uiActions";
import { logout } from "../../redux/actions/userActions";

import Logo from "../../assets/logo.png";
import tempImg from "../../assets/default-user-300x300.png";
import NavProfile from "./NavProfile";

const styles = (theme) => ({
    appBar: {
        backgroundColor: "#001f3f",
        marginBottom: "4em",
    },
    title: {
        paddingLeft: "1em",
        color: "white",
    },
    leftmostRightGroupButton: {
        marginLeft: "auto",
        textDecoration: "none",
        color: "white",
    },
    link: {
        textDecoration: "none",
    },
});

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            profileAnchor: null,
        };
    }

    onProfileClick = (event) => {
        event.persist();
        event.preventDefault();

        this.setState({
            profileAnchor: event.currentTarget,
        });
        console.log(this.state);
    };

    onProfileClose = (event) => {
        this.setState({ profileAnchor: null });
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={Logo}
                            style={{ maxHeight: "3em" }}
                            alt="Nexus Logo"
                        />
                        <Typography className={classes.title} variant="h6">
                            Nexus
                        </Typography>
                    </Link>

                    <Avatar
                        src={tempImg}
                        className={classes.leftmostRightGroupButton}
                        onClick={this.onProfileClick}
                    />
                    <Popover
                        id={
                            this.state.profileAnchor === null
                                ? undefined
                                : "simple-pooper"
                        }
                        open={this.state.profileAnchor !== null}
                        onClose={this.onProfileClose}
                        anchorEl={this.state.profileAnchor}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <NavProfile />
                    </Popover>
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
