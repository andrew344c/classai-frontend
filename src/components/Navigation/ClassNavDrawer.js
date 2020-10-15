import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@material-ui/core";

import { Home, Assessment, Settings } from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions/uiActions";

class ClassNavDrawer extends Component {
    render() {
        return (
            <Drawer
                anchor="left"
                open={this.props.open}
                onClose={this.props.toggleDrawer}
            >
                <List subheader={<ListSubheader>Navigation</ListSubheader>}>
                    <ListItem
                        button
                        onClick={() => {
                            this.props.toggleDrawer();
                            this.props.history.push("/");
                        }}
                    >
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText
                            style={{ paddingRight: "8em" }}
                            primary="Home"
                        />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => {
                            this.props.toggleDrawer();
                            this.props.history.push("/grades");
                        }}
                    >
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText
                            style={{ paddingRight: "3em" }}
                            primary="Grades"
                        />
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => {
                            this.props.toggleDrawer();
                            this.props.history.push("/settings");
                        }}
                    >
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default withRouter(ClassNavDrawer);
