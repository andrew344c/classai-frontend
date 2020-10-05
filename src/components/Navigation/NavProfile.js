import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userActions";

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

const styles = (theme) => ({
    profileName: {
        marginBottom: 0,
    },
    lineBreak: {
        marginTop: 0,
    },
});

class NavProfile extends Component {
    onLogout = () => {
        this.props.logout().then(() => {
            this.props.history.push("/login");
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <ListItem className={classes.profileName}>
                    <ListItemAvatar>
                        <Avatar src={tempImg} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Andrew Chiang`}
                        secondary={"andrew"}
                    />
                </ListItem>
                <Divider />
                <Button
                    onClick={() => {
                        alert("Settings page currently under progress");
                    }}
                >
                    <ListItem>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <Typography>Settings</Typography>
                    </ListItem>
                </Button>
                <Button onClick={this.onLogout}>
                    <ListItem>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <Typography>Log Out</Typography>
                    </ListItem>
                </Button>
            </Paper>
        );
    }
}

export default connect(null, { logout })(
    withRouter(withStyles(styles)(NavProfile))
);
