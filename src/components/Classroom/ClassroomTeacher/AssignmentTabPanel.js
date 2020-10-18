import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

import {
    Paper,
    TextField,
    Typography,
    Button,
    Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/styles";

import dayjs from "dayjs";
import LoadingBackdrop from "../../LoadingBackdrop";

const styles = (theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        width: "90%",
        margin: "auto",
    },
    paper: {
        padding: "2em",
        margin: "1em",
    },
    gradePaper: {
        width: "50%",
        margin: "1em auto",
        padding: "2em",
    },
    title: {
        width: "90%",
        margin: "0.25em auto",
    },
    button: {
        marginTop: "2em",
    },
});

class AssignmentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grade: null,
            notes: "",
            loading: false,
            errors: false,
        };
    }

    onChange = (event) => {
        event.persist();
        event.preventDefault();

        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.value,
        }));
    };

    onSubmission = () => {
        if (
            isNaN(parseFloat(this.state.grade)) ||
            parseFloat(this.state.grade) < 0
        ) {
            this.setState((oldState) => ({
                ...oldState,
                errors: "Grade must be 0 or a positive number",
            }));
            return;
        }
        axios
            .post(
                `/classrooms/${this.props.match.params.classroomId}/submissions/${this.props.match.params.assignmentId}/grade/${this.props.creator}`,
                {
                    grade: this.state.grade,
                    notes: this.state.notes,
                }
            )
            .then((res) => {
                this.setState((oldState) => ({
                    ...oldState,
                    loading: false,
                    errors: false,
                    success: true,
                }));
            })
            .catch((err) => {
                console.error(err);
                this.setState((oldState) => ({
                    ...oldState,
                    loading: false,
                    errors: "An unexpected error occurred, please try again.",
                }));
            });
        this.setState((oldState) => ({
            ...oldState,
            loading: true,
        }));
    };

    onCloseError = () => {
        this.setState((oldState) => ({
            ...oldState,
            errors: false,
        }));
    };

    onCloseSuccess = () => {
        this.setState((oldState) => ({
            ...oldState,
            success: false,
        }));
    };

    render() {
        const { index, open, classes, submissions, assignment } = this.props;
        return (
            <div
                role="tabpanel"
                hidden={!open}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
            >
                <LoadingBackdrop open={this.state.loading} />
                <Snackbar
                    open={this.state.errors}
                    autoHideDuration={7000}
                    onClose={() => {
                        this.setState((oldState) => ({
                            ...oldState,
                            errors: false,
                        }));
                    }}
                >
                    <Alert severity="error" onClose={this.onCloseError}>
                        {this.state.errors}
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={this.state.success}
                    autoHideDuration={7000}
                    onClose={this.onCloseSuccess}
                >
                    <Alert severity="success" onClose={this.onCloseSuccess}>
                        Successfully graded assignment for student
                    </Alert>
                </Snackbar>
                <Typography variant="h4" className={classes.title}>
                    Submissions ({submissions.length})
                </Typography>
                <div className={classes.container}>
                    {submissions.map((submission) => {
                        console.log(assignment.hasDueDate);
                        console.log(assignment.dueDate >= submission.createdAt);
                        return (
                            <Paper className={classes.paper}>
                                <Typography variant="h4">{`${submission.creator.firstName} ${submission.creator.lastName}`}</Typography>
                                <hr />
                                <Typography variant="h6">
                                    Submission Type:{" "}
                                    {submission.type.charAt(0).toUpperCase() +
                                        submission.type.slice(1)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    style={
                                        assignment.hasDueDate
                                            ? assignment.dueDate >=
                                              submission.createdAt
                                                ? {
                                                      color: "green",
                                                  }
                                                : {
                                                      color: "red",
                                                  }
                                            : null
                                    }
                                >
                                    {`Date Submitted: ${dayjs(
                                        submission.createdAt
                                    ).format("MMMM D, YYYY h:mm A")} ${
                                        assignment.dueDate >=
                                        submission.createdAt
                                            ? "(On Time)"
                                            : "(Late)"
                                    }`}
                                </Typography>
                                {submission.type === "file" ? (
                                    <a href={submission.downloadUrl} download>
                                        Download submission file
                                    </a>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: "2em",
                                            marginBottom: "2em",
                                        }}
                                    >
                                        <Typography variant="h5">
                                            Submission (Text):
                                        </Typography>
                                        <div
                                            style={{
                                                border: "1px solid black",
                                                marginTop: "0.5em",
                                                marginBottom: "0.5em",
                                                padding: "0.7em",
                                            }}
                                        >
                                            <Typography>
                                                {submission.text}
                                            </Typography>
                                        </div>
                                    </div>
                                )}

                                {submission.type === "file" ? (
                                    <Typography>
                                        {`Text Derived From OCR: 
                                        ${submission.ocrText}`}
                                    </Typography>
                                ) : null}
                                <Typography>{`Similar Websites to Submission: ${submission.plagarismLinks}`}</Typography>
                            </Paper>
                        );
                    })}
                </div>
                {assignment.graded ? (
                    <Paper className={classes.gradePaper}>
                        <Typography variant="h4">Grading</Typography>
                        <hr />
                        <Typography>
                            Assignment Point Total: {assignment.points}
                        </Typography>
                        <TextField
                            autoFocus
                            label={`Points (Out of ${assignment.points})`}
                            name="grade"
                            onChange={this.onChange}
                            value={this.state.grade}
                            autoComplete="off"
                        />
                        <TextField
                            autoFocus
                            label="Notes"
                            name="notes"
                            onChange={this.onChange}
                            value={this.state.notes}
                            fullWidth
                            multiline
                            autoComplete="off"
                        />
                        <Button
                            className={classes.button}
                            onClick={this.onSubmission}
                        >
                            Submit Grade
                        </Button>
                    </Paper>
                ) : null}
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(AssignmentTab));
