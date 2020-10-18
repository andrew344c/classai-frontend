import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { withStyles } from "@material-ui/styles";
import { Tabs, Tab, Typography } from "@material-ui/core";

import Navbar from "../components/Navigation/Navbar";
import UserListItem from "../components/UserListItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

import tempImg from "../assets/default-user-300x300.png";
import AssignmentTab from "../components/Classroom/ClassroomTeacher/AssignmentTabPanel";

const styles = (theme) => ({
    container: {
        flexGrow: 1,
        display: "flex",
    },
    tab: {
        borderBottom: "1px solid lightgrey",
        borderRight: "1px solid lightgrey",
        paddingRight: "5em",
        width: "50em",
        textTransform: "none",
    },
    titleBar: {
        borderBottom: "1px solid lightgrey",
        width: "100vw",
        padding: "2em",
    },
});

class AssignmentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submissions: [],
            assignment: null,
            tabValue: 0,
            loading: true,
            errors: false,
        };
    }

    componentDidMount() {
        axios
            .get(
                `/classrooms/${this.props.match.params.classroomId}/submissions/${this.props.match.params.assignmentId}`
            )
            .then((res) => {
                console.log(this.props.submissions);
                this.setState((oldState) => ({
                    ...oldState,
                    errors: false,
                    loading: false,
                    submissions: res.data.submissions,
                    assignment: res.data.assignment,
                }));
            })
            .catch((err) => {
                if (
                    err.response &&
                    (err.response.status === 404 || err.response.status === 401)
                ) {
                    this.props.history.push("/login");
                }
                this.setState((oldState) => ({
                    errors: "An unexpected error occurred, please try again.",
                    loading: false,
                }));
            });
        this.setState((oldState) => ({
            ...oldState,
            errors: false,
            loading: true,
        }));
    }

    onTabChange = (event, value) => {
        this.setState((oldState) => ({
            ...oldState,
            tabValue: value,
        }));
    };

    parseCreatorsToAssignmentTabs = (creators) => {
        let assignmentTabs = [];
        let i = 0;
        for (const creator in creators) {
            let submissions = creators[creator];
            assignmentTabs.push(
                <AssignmentTab
                    open={this.state.tabValue === i}
                    index={i}
                    submissions={submissions}
                    assignment={this.state.assignment}
                    creator={creator}
                    key={creator}
                />
            );
            i++;
        }
        console.log(assignmentTabs);
        return assignmentTabs;
    };

    render() {
        const { classes } = this.props;
        let creators = {};
        return (
            <Fragment>
                <Navbar nomargin={true} />
                {this.state.loading ? (
                    <LoadingBackdrop open={this.state.loading} />
                ) : (
                    <Fragment>
                        <div className={classes.titleBar}>
                            <Typography variant="h4">
                                {this.state.assignment.name}
                            </Typography>
                        </div>
                        <div className={classes.container}>
                            <Tabs
                                orientation="vertical"
                                value={this.state.tabValue}
                                onChange={this.onTabChange}
                                variant="scrollable"
                            >
                                {this.state.submissions.map((submission, i) => {
                                    if (
                                        creators[
                                            submission.creator.username
                                        ] === undefined
                                    ) {
                                        creators = {
                                            ...creators,
                                            [submission.creator.username]: [
                                                submission,
                                            ],
                                        };
                                        return (
                                            <Tab
                                                label={
                                                    <UserListItem
                                                        username={
                                                            submission.creator
                                                                .username
                                                        }
                                                        firstName={
                                                            submission.creator
                                                                .firstName
                                                        }
                                                        lastName={
                                                            submission.creator
                                                                .lastName
                                                        }
                                                        nobutton={true}
                                                    />
                                                }
                                                className={classes.tab}
                                                key={submission.id}
                                            />
                                        );
                                    } else {
                                        creators[
                                            submission.creator.username
                                        ].push(submission);
                                    }
                                })}
                            </Tabs>
                            {this.parseCreatorsToAssignmentTabs(creators)}
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default withStyles(styles)(AssignmentDashboard);
