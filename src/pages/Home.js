// React
import React, { Component, Fragment } from "react";

// React Router
import { Redirect } from "react-router-dom";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

// Redux
import { connect } from "react-redux";
import { getClassrooms, clearRedirect } from "../redux/actions/dataActions";

// Components
import Navigation from "../components/Navigation";
import ClassroomSummaryCard from "../components/Home/ClassroomSummaryCard";
import AddClassroomDialog from "../components/Home/AddClassroomDialog";

const styles = (theme) => ({
    classroomsContainer: {
        width: "80%",
        margin: "0 auto",
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        this.props.getClassrooms().then(() => {
            this.setState({ loaded: true });
        });
    }

    render() {
        const { classes } = this.props;
        if (this.props.redirect) {
            this.props.clearRedirect();
            return <Redirect to={this.props.redirect} />;
        } else {
            return this.props.authenticated ? (
                <Fragment>
                    <Navigation />
                    <div className={classes.classroomsContainer}>
                        {this.state.loaded ? (
                            this.props.classrooms.map((classroom) => {
                                return (
                                    <ClassroomSummaryCard
                                        key={classroom.classroomId}
                                        history={this.props.history}
                                        classroom={classroom}
                                    />
                                );
                            })
                        ) : (
                            <CircularProgress
                                style={{ display: "block", margin: "0 auto" }}
                            />
                        )}
                        <AddClassroomDialog />
                    </div>
                </Fragment>
            ) : (
                <Redirect to="/login" />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    classrooms: state.data.classrooms,
    redirect: state.data.redirect,
    authenticated: state.user.authenticated,
});

const mapActionToProps = {
    getClassrooms,
    clearRedirect,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(Home));
