// React
import React, { Component, Fragment } from "react";

// React Router
import { Redirect } from "react-router-dom";

// Material UI
import { withStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { getClassrooms } from "../redux/actions/dataActions";

// Components
import Navigation from "../components/Navigation";
import ClassroomSummaryCard from "../components/Home/ClassroomSummaryCard";
import AddClassroomDialog from "../components/Home/AddClassroomDialog";
import ClassroomShowcase from "../components/Overview/ClassroomShowcase";
import ClassroomDescription from "../components/Overview/ClassroomDescription";

const styles = (theme) => ({
    grid: {
        width: "85%",
        margin: "0 auto",
    },
    classroomsContainer: {
        width: "80%",
        margin: "0 auto",
    },
});

class Home extends Component {
    componentDidMount() {
        this.props.getClassrooms();
    }

    render() {
        const { classes } = this.props;
        return this.props.authenticated ? (
            <Fragment>
                <Navigation />
                <div className={classes.classroomsContainer}>
                    {this.props.classrooms.map((classroom) => {
                        return <ClassroomSummaryCard classroom={classroom} />;
                    })}
                    <AddClassroomDialog />
                </div>
            </Fragment>
        ) : (
            <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state) => ({
    classrooms: state.data.classrooms,
    authenticated: state.user.authenticated,
});

const mapActionToProps = {
    getClassrooms,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(Home));
