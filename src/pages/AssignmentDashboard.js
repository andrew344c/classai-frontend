import React, { Component, Fragment } from "react";

import axios from "axios";

import dayjs from "dayjs";

import { connect } from "react-redux";
import { setExtensions } from "../redux/actions/uiActions";

import { withStyles } from "@material-ui/styles";
import {
    Tabs,
    Tab,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Grid,
    Button,
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Card,
    CardContent,
    IconButton,
    Snackbar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CalendarToday from "@material-ui/icons/CalendarToday";
import CloseIcon from "@material-ui/icons/Close";

import Navbar from "../components/Navigation/Navbar";
import UserListItem from "../components/UserListItem";
import LoadingBackdrop from "../components/LoadingBackdrop";

import tempImg from "../assets/default-user-300x300.png";
import AssignmentTab from "../components/Classroom/ClassroomTeacher/AssignmentTabPanel";
import ExtensionDialog from "../components/Classroom/ClassroomTeacher/ExtensionDialog";
import { Alert } from "@material-ui/lab";

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
    details: {
        alignItems: "center",
    },
    column: {
        flexBasis: "50%",
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
            settingDialog: null,
            settingDialogOpen: false,
            newSettings: {
                name: null,
                description: null,
                dueDate: null,
                points: null,
                extensions: [],
            },
            confirmDelete: false,
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
                this.props.setExtensions(res.data.assignment.extensions);
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

    parseSettings = (newSettings) => {
        let settingComps = [];
        for (const setting in newSettings) {
            let newSettingValue = newSettings[setting];
            console.log("yeet", setting, newSettingValue);
            if (newSettingValue !== null) {
                settingComps.push(
                    <Card
                        style={{
                            wordWrap: "break-word",
                        }}
                    >
                        <CardContent style={{ margin: "0 auto" }}>
                            {setting !== "extensions" ? (
                                <div style={{ display: "flex" }}>
                                    <Typography
                                        style={{
                                            marginRight: "1em",
                                            whiteSpace: "pre-wrap",
                                        }}
                                    >
                                        {`New ${
                                            setting === "dueDate"
                                                ? "Due Date"
                                                : setting
                                        }: ${newSettingValue}`}
                                    </Typography>
                                    <IconButton
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.persist();

                                            this.setState((oldState) => ({
                                                ...oldState,
                                                newSettings: {
                                                    ...oldState.newSettings,
                                                    [setting]: null,
                                                },
                                            }));
                                        }}
                                    >
                                        <CloseIcon />
                                        <Typography>Cancel</Typography>
                                    </IconButton>
                                </div>
                            ) : (
                                <Fragment>
                                    <Typography variant="h6">
                                        Extensions:
                                    </Typography>
                                    <ul>
                                        {newSettingValue.map((setting) => {
                                            return <li>{setting}</li>;
                                        })}
                                    </ul>
                                </Fragment>
                            )}
                        </CardContent>
                    </Card>
                );
            }
        }
        return settingComps;
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
        return assignmentTabs;
    };

    changeSetting = (e, setting) => {
        e.preventDefault();
        e.persist();

        let onDialogClose = (e) => {
            e.persist();
            e.preventDefault();

            this.setState((oldState) => ({
                ...oldState,
                settingDialog: null,
                newSettings: {
                    ...oldState.newSettings,
                    [setting]: null,
                },
            }));
        };

        let settingDialog;
        if (setting === "extensions") {
            settingDialog = (
                <ExtensionDialog open={true} handleClose={onDialogClose} />
            );
        } else {
            settingDialog = (
                <Dialog open={true} onClose={onDialogClose}>
                    <DialogTitle>Change assignment {setting}</DialogTitle>
                    <DialogContent>
                        {setting !== "dueDate" ? (
                            <TextField
                                fullWidth
                                label={`New assignment ${setting}`}
                                value={this.state.newSettings[setting]}
                                onChange={(e) => {
                                    e.preventDefault();
                                    e.persist();

                                    console.log(setting, e.target.value);
                                    this.setState((oldState) => ({
                                        ...oldState,
                                        newSettings: {
                                            ...oldState.newSettings,
                                            [setting]: e.target.value,
                                        },
                                    }));
                                    console.log(this.state);
                                }}
                            />
                        ) : (
                            <TextField
                                id="datetime-local"
                                label="New Due Date"
                                type="datetime-local"
                                defaultValue=""
                                onChange={(e) => {
                                    e.preventDefault();
                                    e.persist();

                                    this.setState((oldState) => ({
                                        ...oldState,
                                        newSettings: {
                                            ...oldState.newSettings,
                                            dueDate: new Date(
                                                e.target.value + ":00"
                                            ).toISOString(),
                                        },
                                    }));
                                }}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    </DialogContent>

                    <DialogActions>
                        <hr />
                        <Button onClick={onDialogClose}>Cancel</Button>
                        <Button
                            onClick={() => {
                                this.setState((oldState) => ({
                                    ...oldState,
                                    settingDialog: null,
                                }));
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }

        this.setState((oldState) => ({
            ...oldState,
            settingDialog,
        }));
    };

    onDeleteClick = (e) => {
        e.preventDefault();
        e.persist();

        let closeDialog = (e) => {
            e.persist();
            e.preventDefault();

            this.setState((oldState) => ({
                ...oldState,
                settingDialog: null,
            }));
        };

        let settingDialog = (
            <Dialog open={true} onClose={closeDialog}>
                <DialogTitle>Delete Assignment</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this assignment? All
                        submissions and grades for this assignment will be
                        deleted. This is a permananet action.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button color="secondary" onClick={this.onDelete}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );

        this.setState((oldState) => ({
            ...oldState,
            settingDialog,
        }));
    };

    onDelete = () => {
        axios
            .delete(
                `/classrooms/${this.props.match.params.classroomId}/assignments/${this.props.match.params.assignmentId}`
            )
            .then(() => {
                this.props.history.push(
                    `/classrooms/${this.props.match.params.classroomId}`
                );
            })
            .catch((err) => {
                console.error(err);
                if (err.response) {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors: err.response.data,
                    }));
                } else {
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors:
                            "An unexpected error occurred, please try again.",
                    }));
                }
            });

        this.setState((oldState) => ({
            ...oldState,
            loading: true,
        }));
    };

    onEdit = () => {
        axios.put(
            `/classrooms/${this.props.match.params.classroomId}/assignments/${this.props.match.params.assignmentId}`,
            this.state.newSettings
        ).then(() => {
            
        });
    };

    render() {
        const { classes } = this.props;

        let creators = {};
        let creatorTabs = this.state.submissions.map((submission, i) => {
            if (creators[submission.creator.username] === undefined) {
                creators = {
                    ...creators,
                    [submission.creator.username]: [submission],
                };
                return (
                    <Tab
                        label={
                            <UserListItem
                                username={submission.creator.username}
                                firstName={submission.creator.firstName}
                                lastName={submission.creator.lastName}
                                nobutton={true}
                            />
                        }
                        className={classes.tab}
                        key={submission.id}
                    />
                );
            } else {
                creators[submission.creator.username].push(submission);
            }
        });

        return (
            <Fragment>
                <Navbar nomargin={true} />
                {this.state.loading ? (
                    <LoadingBackdrop open={this.state.loading} />
                ) : (
                    <Fragment>
                        {this.state.settingDialog}
                        <Snackbar
                            open={this.state.errors}
                            onClose={() =>
                                this.setState((oldState) => ({
                                    ...oldState,
                                    errors: false,
                                }))
                            }
                            autoHideDuration={7000}
                        >
                            <Alert
                                severity="error"
                                onClose={() =>
                                    this.setState((oldState) => ({
                                        ...oldState,
                                        errors: false,
                                    }))
                                }
                            >
                                {this.state.errors}
                            </Alert>
                        </Snackbar>
                        <ExpansionPanel className={classes.titleBar}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant="h4">
                                    {this.state.assignment.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <hr />
                            <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid
                                        item
                                        md={6}
                                        style={{
                                            borderBottom: "1px solid grey",
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Description:{" "}
                                            {this.state.assignment.description}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        style={{
                                            borderLeft: "1px solid grey",
                                        }}
                                    >
                                        <div
                                            style={{
                                                margin: "0 auto",
                                                width: "max-content",
                                            }}
                                        >
                                            <Typography variant="h6">
                                                Change Assignment Settings
                                            </Typography>
                                            <hr />
                                            <ButtonGroup
                                                orientation="vertical"
                                                color="primary"
                                            >
                                                <Button
                                                    onClick={(e) =>
                                                        this.changeSetting(
                                                            e,
                                                            "name"
                                                        )
                                                    }
                                                >
                                                    Change Assignment Name
                                                </Button>
                                                <Button
                                                    onClick={(e) =>
                                                        this.changeSetting(
                                                            e,
                                                            "description"
                                                        )
                                                    }
                                                >
                                                    Change Assignment
                                                    Description
                                                </Button>
                                                <Button
                                                    onClick={(e) =>
                                                        this.changeSetting(
                                                            e,
                                                            "dueDate"
                                                        )
                                                    }
                                                >
                                                    Change Assignment Due Date
                                                </Button>
                                                <Button
                                                    onClick={(e) =>
                                                        this.changeSetting(
                                                            e,
                                                            "points"
                                                        )
                                                    }
                                                >
                                                    Change Assignment Grading
                                                </Button>
                                                <Button
                                                    onClick={(e) =>
                                                        this.changeSetting(
                                                            e,
                                                            "extensions"
                                                        )
                                                    }
                                                >
                                                    Change Assignment Extensions
                                                </Button>
                                                <Button
                                                    color="secondary"
                                                    onClick={this.onDeleteClick}
                                                >
                                                    Delete Assignment
                                                </Button>
                                            </ButtonGroup>
                                            <div style={{ margin: "1em auto" }}>
                                                <Typography variant="h6">
                                                    Assignment Settings to be
                                                    Changed
                                                </Typography>
                                                <hr />
                                                {this.parseSettings(
                                                    this.state.newSettings
                                                )}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        style={{
                                            marginTop: "1em",
                                        }}
                                    >
                                        <div style={{ display: "flex" }}>
                                            <CalendarToday
                                                color="primary"
                                                style={{
                                                    marginRight: "10px",
                                                    marginBottom: "5px",
                                                }}
                                            />{" "}
                                            <Typography>
                                                Created{" "}
                                                {dayjs(
                                                    this.state.assignment
                                                        .createdAt
                                                ).format("MMMM D, YYYY h:mm A")}
                                            </Typography>
                                        </div>
                                        <Typography>
                                            {this.state.assignment.hasDueDate
                                                ? `
                                        Due Date: ${dayjs(
                                            this.state.assignment.dueDate
                                        ).format("MMMM D, YYYY h:mm A")}
                                        `
                                                : "No Due Date"}
                                        </Typography>
                                        <Typography>
                                            {this.state.assignment.points
                                                ? `Point Total: ${this.state.assignment.points}`
                                                : "Not Graded"}
                                        </Typography>

                                        {this.state.assignment.extensions
                                            .length !== 0 ? (
                                            <div>
                                                <Typography>
                                                    Extensions on assignment:{" "}
                                                </Typography>
                                                <ul>
                                                    {this.state.assignment.extensions.map(
                                                        (extension) => {
                                                            return (
                                                                <li>
                                                                    {extension}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        ) : (
                                            <Typography>
                                                No extensions attached to this
                                                assignment
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        {/*<div className={classes.titleBar}>
                            <Typography variant="h4">
                                {this.state.assignment.name}
                            </Typography>
                </div>*/}
                        <div className={classes.container}>
                            <Tabs
                                orientation="vertical"
                                value={this.state.tabValue}
                                onChange={this.onTabChange}
                                variant="scrollable"
                            >
                                <Tab
                                    label={
                                        <Typography>{`Student Submitted (${
                                            Object.keys(creators).length
                                        })`}</Typography>
                                    }
                                    className={classes.tab}
                                />
                                {creatorTabs}
                            </Tabs>
                            {this.parseCreatorsToAssignmentTabs(creators)}
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    extensions: state.ui.extensions,
});

const mapActionToProps = {
    setExtensions,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(AssignmentDashboard));
