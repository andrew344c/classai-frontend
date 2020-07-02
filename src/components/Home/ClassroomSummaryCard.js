import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import { CardContent, ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    card: {
        marginBottom: 20,
    },
});

class ClassroomSummaryCard extends Component {
    render() {
        const { classes, classroom } = this.props;

        return (
            <Card key={classroom.id} className={classes.card}>
                <CardContent>
                    <Typography variant="h6">{classroom.name}</Typography>
                    <Typography>{classroom.description}</Typography>
                    <Typography>Teachers: </Typography>
                    <List>
                        {classroom.teachers.map((teacher) => {
                            return (
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar src="../../assets/default-user-300x300.png" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={teacher}
                                        secondary={"Owner"}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ClassroomSummaryCard);
