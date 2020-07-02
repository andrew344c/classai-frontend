import React, { Component, Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { getClassrooms } from "../redux/actions/dataActions";

import Navigation from "../components/Navigation";
import ClassroomSummaryCard from "../components/Home/ClassroomSummaryCard";
import ClassroomShowcase from "../components/Overview/ClassroomShowcase";
import ClassroomDescription from "../components/Overview/ClassroomDescription";
import { CardContent, ListItemText } from "@material-ui/core";
import AddClassroomDialog from "../components/Home/AddClassroomDialog";

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
        return (
            <Fragment>
                <Navigation />
                <div className={classes.classroomsContainer}>
                    {this.props.classrooms.map((classroom) => {
                        return <ClassroomSummaryCard classroom={classroom} />;
                    })}
                    <AddClassroomDialog />
                </div>
                {/*
                    <ClickAwayListener onClickAway={this.onClickAway}>
                        <Button onClick={this.onClick}>
                            <AddIcon />
                            <Typography variant="body3">
                                Join or create a classroom
                            </Typography>
                            {this.state.addOpen ? (
                                <div className={classes.addClass}></div>
                            ) : null}
                        </Button>
                    </ClickAwayListener>
                </div>
                            }
                {/**
                <Grid container spacing={8} className={classes.grid}>
                    <Grid item sm={4} xs={12}>
                        <ClassroomDescription />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <ClassroomShowcase />
                    </Grid>
                </Grid>
                */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    classrooms: state.data.classrooms,
});

const mapActionToProps = {
    getClassrooms,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(Home));
