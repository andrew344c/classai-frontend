import React, { Component } from "react";

import {
    Card,
    CardContent,
    Typography,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import tempImg from "../../assets/default-user-300x300.png";

const styles = (theme) => ({
    card: {
        marginBottom: 20,
    },
});

class AssignmentCard extends Component {
    render() {
        const { classes, assignment } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h4">{assignment.name}</Typography>
                    <hr />
                    <Typography>{assignment.description}</Typography>
                </CardContent>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar src={tempImg} />
                    </ListItemAvatar>
                    <ListItemText primary={`${assignment.creator.firstName} ${assignment.creator.lastName}`} secondary={assignment.creator.username} />
                </ListItem>
            </Card>
        );
    }
}

export default withStyles(styles)(AssignmentCard);
