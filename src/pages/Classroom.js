import React, { Component, Fragment } from "react";

// React Router
import { withRouter } from "react-router";

// Material UI
import { Grid, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { getClassroom } from "../redux/actions/dataActions";

// Components
import Navigation from "../components/Navigation";
import ClassroomProfile from "../components/Classroom/ClassroomProfile";
import MemberList from "../components/Classroom/MemberList";

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

    render() {
        const { classes, classroom } = this.props;

        // temp, store loading state in redux later
        return (
            <Fragment>
                <Navigation /> {/*fix unneccesary rerendering later*/}
                {classroom !== undefined ? (
                    <Grid container spacing={6} className={classes.grid}>
                        <Grid item sm={4} xs={12}>
                            <ClassroomProfile
                                name={classroom.name}
                                description={classroom.description}
                                createdAt={classroom.createdAt}
                            />
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            {}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <MemberList
                                teachers={classroom.teachers}
                                students={classroom.students}
                            />
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
});
const mapActionsToProps = {
    getClassroom,
};

export default withRouter(
    connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Classroom))
);
