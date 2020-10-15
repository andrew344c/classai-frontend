import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userActions";

import { Link } from "react-router-dom";

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
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import tempImg from "../../assets/default-user-300x300.png";
import LoadingBackdrop from "../LoadingBackdrop";

const styles = (theme) => ({
    profileName: {
        marginBottom: 0,
    },
    lineBreak: {
        marginTop: 0,
    },
});

class NavProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggingOut: false,
        };
    }

    onLogout = () => {
        this.setState({ loggingOut: true });
        this.props
            .logout()
            .then(() => {
                this.props.history.push("/login");
            })
            .catch(() => {
                this.setState({ loggingOut: false });
            });
    };

    render() {
        const { classes } = this.props;
        const username = localStorage.getItem("username");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");

        return (
            <Paper className={classes.paper}>
                <ListItem className={classes.profileName}>
                    <ListItemAvatar>
                        <Avatar src={tempImg} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${firstName} ${lastName}`}
                        secondary={username}
                    />
                </ListItem>
                <Divider />
                <Link
                    to="/Settings"
                    style={{
                        textDecoration: "none",
                        display: "inline",
                        alignItems: "center",
                    }}
                >
                    <Button>
                        <ListItem>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <Typography>Settings</Typography>
                        </ListItem>
                    </Button>
                </Link>
                <Button onClick={this.onLogout}>
                    <ListItem>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <Typography>Log Out</Typography>
                    </ListItem>
                </Button>
                <LoadingBackdrop open={this.state.loggingOut} />
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
});

const mapActionToProps = { logout };

export default connect(
    mapStateToProps,
    mapActionToProps
)(withRouter(withStyles(styles)(NavProfile)));
