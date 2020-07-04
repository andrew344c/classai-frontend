import React, { Component } from "react";

import { Paper, Typography } from "@material-ui/core";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { withStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";

import tempImg from "../../assets/default-classroom.png";

const styles = (theme) => ({
    paper: {
        padding: 20,
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
    render() {
        const { classes, name, description, createdAt } = this.props;
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
                        <hr />
                        <CalendarToday color="primary" />{" "}
                        <span>
                            Created{" " /** Used for space between */}
                            {dayjs(createdAt).format("MMM YYYY")}
                        </span>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ClassroomProfile);
