import React, { Component, Fragment } from "react";

import {
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import tempImg from "../../assets/default-user-300x300.png";

const styles = (theme) => ({
    paper: {
        padding: 20,
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    },
});

class MemberList extends Component {
    render() {
        const { classes, teachers, students } = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6">Teachers</Typography>
                <List>
                    {teachers.map((teacher) => (
                        <ListItem key={teacher.username}>
                            <ListItemAvatar>
                                <Avatar src={tempImg} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${teacher.firstName} ${teacher.lastName}`}
                                secondary={teacher.username}
                            />
                        </ListItem>
                    ))}
                </List>
                <hr />
                <Typography variant="h6">Students</Typography>
                <List>
                    {students.map((student) => (
                        <ListItem key={student.username}>
                            <ListItemAvatar>
                                <Avatar src={tempImg} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${student.firstName} ${student.lastName}`}
                                secondary={student.username}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }
}

export default withStyles(styles)(MemberList);
