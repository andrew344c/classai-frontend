import React, { Component } from "react";

import { Paper, Typography, Button } from "@material-ui/core";
import { CalendarToday, DeleteForever } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { deleteClassroom } from "../../../redux/actions/userActions";

import dayjs from "dayjs";

import tempImg from "../../../assets/default-classroom.png";

const styles = (theme) => ({
    paper: {
        padding: 20,
        marginBottom: "3em",
        backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle",
            },
            "& a": {
                color: "#00bcd4",
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
});

class ClassroomProfile extends Component {
    onDelete = () => {
        this.props.deleteClassroom(this.props.id);
    };

    render() {
        const { classes, name, description, createdAt, id } = this.props;
        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img
                            src={tempImg}
                            alt="profile"
                            className="profile-image"
                        />
                    </div>
                    <hr />
                    <div className="profile-details">
                        <Typography variant="h5">{name}</Typography>
                        <Typography variant="body2">{description}</Typography>
                        <Typography variant="h8"><b>Class Code: {id}</b></Typography>
                        <hr />
                        <CalendarToday color="primary" />{" "}
                        <span>
                            Created{" " /** Used for space between */}
                            {dayjs(createdAt).format("MMMM YYYY")}
                        </span>
                    </div>
                    <div style={{ textAlign: "center", paddingTop: "2em" }}>
                    </div>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state.data.classroom,
});

const mapActionToProps = {
    deleteClassroom,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(ClassroomProfile));
