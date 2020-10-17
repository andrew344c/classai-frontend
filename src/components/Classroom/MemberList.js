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
import UserListItem from "../UserListItem";

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
                        <UserListItem
                            key={teacher.username}
                            firstName={teacher.firstName}
                            lastName={teacher.lastName}
                            username={teacher.username}
                            imgSrc={tempImg}
                        />
                    ))}
                </List>
                <hr />
                <Typography variant="h6">Students</Typography>
                <List>
                    {students.map((student) => (
                        <UserListItem
                            key={student.username}
                            firstName={student.firstName}
                            lastName={student.lastName}
                            username={student.username}
                            imgSrc={tempImg}
                        />
                    ))}
                </List>
            </Paper>
        );
    }
}

export default withStyles(styles)(MemberList);
