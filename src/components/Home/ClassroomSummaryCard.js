import React, { Component } from "react";

// Material UI
import Card from "@material-ui/core/Card";
import {
    CardContent,
    ListItemText,
    CardMedia,
    Container,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

// Temporary Images, will add feature to receive images from db later
import tempImg from "../../assets/default-user-300x300.png";
import tempBackground from "../../assets/cool-background.svg";
import UserListItem from "../UserListItem";

const styles = (theme) => ({
    card: {
        marginBottom: 20,
        //backgroundColor: "#ebf1fa",
        backgroundImage: `url(${tempBackground})`,
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
    },
});

class ClassroomSummaryCard extends Component {
    onCardClick = (event) => {
        if (event.target.getAttribute("name") !== "userListItem") {
            this.props.history.push(
                `classroom/${this.props.classroom.classroomId}`
            );
        }
    };

    render() {
        const { classes, classroom } = this.props;
        return (
            <Card
                key={classroom.classroomId}
                className={classes.card}
                onClick={this.onCardClick}
            >
                <CardContent>
                    <Typography variant="h4">{classroom.name}</Typography>
                    <Typography>{classroom.description}</Typography>
                    <hr />
                    <Typography variant="h6">Teachers</Typography>
                    <List>
                        {classroom.teachers.map((teacher) => {
                            return (
                                <UserListItem
                                    key={teacher.username}
                                    username={teacher.username}
                                    firstName={teacher.firstName}
                                    lastName={teacher.lastName}
                                    imgSrc={tempImg}
                                    name="teacher"
                                />
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ClassroomSummaryCard);
