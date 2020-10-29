import React, { Component } from "react";
import {
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    Grid,
    ButtonGroup,
    Button,
} from "@material-ui/core";
import {
    ExpandMore as ExpandMoreIcon,
    CalendarToday,
} from "@material-ui/icons";
import { withStyles } from "@material-ui/core";

import dayjs from "dayjs";


const styles = (theme) => ({
    titleBar: {
        borderBottom: "1px solid lightgrey",
        width: "100vw",
        padding: "2em",
    },
    column: {
        flexBasis: "50%",
    },
});

class AssignmentInfoPanel extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <ExpansionPanel className={classes.titleBar}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
                                                this.changeSetting(e, "name")
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
                                            Change Assignment Description
                                        </Button>
                                        <Button
                                            onClick={(e) =>
                                                this.changeSetting(e, "dueDate")
                                            }
                                        >
                                            Change Assignment Due Date
                                        </Button>
                                        <Button
                                            onClick={(e) =>
                                                this.changeSetting(e, "points")
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
                                            Assignment Settings to be Changed
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
                                            this.state.assignment.createdAt
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

                                {this.state.assignment.extensions.length !==
                                0 ? (
                                    <div>
                                        <Typography>
                                            Extensions on assignment:{" "}
                                        </Typography>
                                        <ul>
                                            {this.state.assignment.extensions.map(
                                                (extension) => {
                                                    return <li>{extension}</li>;
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
            </div>
        );
    }
}

export default withStyles(styles)(AssignmentInfoPanel);
