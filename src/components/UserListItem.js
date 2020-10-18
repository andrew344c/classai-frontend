import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@material-ui/core";

class UserListItem extends Component {
    onClick = () => {
        this.props.history.push(`/profile/${this.props.username}`);
    };

    render() {
        const isButton = this.props.nobutton === undefined;
        return (
            <ListItem
                button={isButton}
                key={this.props.key}
                onClick={isButton ? this.onClick : null}
                name="userListItem"
            >
                <ListItemAvatar name="userListItem">
                    <Avatar
                        src={this.props.imgSrc}
                        imgProps={{ name: "userListItem" }}
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={`${this.props.firstName} ${this.props.lastName}`}
                    secondary={this.props.username}
                    name="userListItem"
                    primaryTypographyProps={{ name: "userListItem" }}
                    secondaryTypographyProps={{ name: "userListItem" }}
                />
            </ListItem>
        );
    }
}

export default withRouter(UserListItem);
