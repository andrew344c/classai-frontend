import React, { Component } from "react";

import {
    Card,
    CardContent,
    Typography,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import tempImg from "../../assets/default-user-300x300.png";
import SubmitAssignmentDialog from "./ClassroomStudent/SubmitAssignmentDialog";
import SubmissionsViewDialog from "./ClassroomTeacher/SubmissionsViewDialog";
import UserListItem from "../UserListItem";

const styles = (theme) => ({
    card: {
        marginBottom: 20,
        wordWrap: "break-word",
    },
});

class AssignmentCard extends Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
        };
    }

    onClick = (event) => {
        if (event.target.getAttribute("name") !== "userListItem") {
            this.setState((oldState) => ({
                ...oldState,
                dialogOpen: true,
            }));
        }
    };

    onClickAway = () => {
        this.setState((oldState) => ({
            ...oldState,
            dialogOpen: false,
        }));
    };

    render() {
        const { classes, assignment, classroom } = this.props;
        return (
            <div>
                <Card className={classes.card} onClick={this.onClick}>
                    <CardContent>
                        <Typography variant="h4">{assignment.name}</Typography>
                        <hr />
                        <Typography style={{ whiteSpace: "pre-wrap" }}>
                            {assignment.description}
                        </Typography>
                    </CardContent>

                    <UserListItem
                        username={assignment.creator.username}
                        firstName={assignment.creator.firstName}
                        lastName={assignment.creator.lastName}
                        imgSrc={tempImg}
                    />
                </Card>
                {classroom.isTeacher ? (
                    <SubmissionsViewDialog
                        className="submitDialog"
                        open={this.state.dialogOpen}
                        onClickAway={this.onClickAway}
                        assignmentId={assignment.id}
                    />
                ) : (
                    <SubmitAssignmentDialog
                        className="submitDialog"
                        open={this.state.dialogOpen}
                        onClickAway={this.onClickAway}
                        assignmentId={assignment.id}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(AssignmentCard);
