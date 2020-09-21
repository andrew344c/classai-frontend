import React, { Component, Fragment } from "react";

// React Router
import { withRouter, Redirect } from "react-router";

// Material UI
import { Grid, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { getClassroom, clearRedirect } from "../redux/actions/dataActions";

// Components
import Navigation from "../components/Navigation";
import ClassroomProfileTeacher from "../components/Classroom/ClassroomTeacher/ClassroomProfileTeacher";
import ClassroomProfileStudent from "../components/Classroom/ClassroomStudent/ClassroomProfileStudent";
import MemberList from "../components/Classroom/MemberList";
import AssignmentCard from "../components/Classroom/AssignmentCard";
import CreateAssignmentDialog from "../components/Classroom/ClassroomTeacher/CreateAssignmentDialog";

const styles = (theme) => ({
    grid: {
        width: "85%",
        margin: "0 auto",
    },
});

class Classroom extends Component {
    componentDidMount() {
        this.props.getClassroom(
            this.props.match.params.classroomId,
            this.props.history
        );
    }

    // TODO: should separate assignments list to separate component
    render() {
        const { classes, classroom } = this.props;

        if (this.props.redirect) {
            this.props.clearRedirect();
            return <Redirect to={this.props.redirect} />;
        }
        // temp, store loading state in redux later
        return (
            <Fragment>
                <Navigation /> {/*fix unneccesary rerendering later*/}
                {Object.keys(classroom).length !== 0 ? (
                    <Grid container spacing={6} className={classes.grid}>
                        <Grid item sm={4} xs={12} className={classes.grid}>
                            <Grid item xs={12}>
                                {classroom.isTeacher ? (
                                    <ClassroomProfileTeacher />
                                ) : (
                                    <ClassroomProfileStudent />
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <MemberList
                                    teachers={classroom.teachers}
                                    students={classroom.students}
                                />
                            </Grid>
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            {classroom.assignments.map((assignment) => (
                                <AssignmentCard
                                    key={assignment.id}
                                    assignment={assignment}
                                    classroom={classroom}
                                />
                            ))}
                            {classroom.isTeacher ? (
                                <CreateAssignmentDialog />
                            ) : null}
                        </Grid>
                    </Grid>
                ) : (
                    <div>
                        <CircularProgress
                            style={{ display: "block", margin: "0 auto" }}
                        />
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    classroom: state.data.classroom,
    redirect: state.data.redirect,
});
const mapActionsToProps = {
    getClassroom,
    clearRedirect,
};

export default withRouter(
    connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Classroom))
);
