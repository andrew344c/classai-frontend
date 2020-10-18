import React, { Component } from "react";

import { connect } from "react-redux";
import { getSubmissions } from "../../../redux/actions/dataActions";

import {
    Dialog,
    Paper,
    Typography,
    CircularProgress,
    Slide,
    Backdrop,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { SportsRugbySharp } from "@material-ui/icons";
import LoadingBackdrop from "../../LoadingBackdrop";

const styles = (theme) => ({
    paper: {
        marginBottom: 20,
        width: "100%",
    },
    img: {
        width: "100%",
        height: "auto",
    },
    textArea: {
        width: "100%",
    },
    loading: {
        margin: "0 auto",
    },
});

class SubmissionsViewDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gotSubmissions: false,
        };
    }
    
    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            this.props
                .getSubmissions(this.props.classroomId, this.props.assignmentId)
                .then(() => {
                    this.setState(() => ({
                        gotSubmissions: true,
                    }));
                });
        }
    }

    render() {
        const { classes } = this.props;

        let content;
        if (this.props.submissions.length === 0) {
            content = <Typography>No submissions yet</Typography>;
        } else {
            content = this.props.submissions.map((submission) => {
                return (
                    <Paper className={classes.paper}>
                        <Typography variant="h4">{`${submission.creator.firstName} ${submission.creator.lastName}`}</Typography>
                        <hr />
                        {submission.type === "file" ? (
                            <img
                                src={submission.downloadUrl}
                                key={submission.id}
                                className={classes.img}
                                alt="submission"
                            />
                        ) : (
                            <div
                                style={{
                                    marginTop: "2em",
                                    marginBottom: "2em",
                                }}
                            >
                                <Typography variant="h5">
                                    Submission (Text):
                                </Typography>
                                <div
                                    style={{
                                        border: "1px solid black",
                                        marginTop: "0.5em",
                                        marginBottom: "0.5em",
                                        padding: "0.7em",
                                    }}
                                >
                                    <Typography>{submission.text}</Typography>
                                </div>
                            </div>
                        )}

                        {submission.type === "file" ? (
                            <Typography>
                                `Text Derived From OCR: ${submission.ocrText}`
                            </Typography>
                        ) : null}
                        <Typography>{`Similar Websites to Submission: ${submission.plagarismLinks}`}</Typography>
                    </Paper>
                );
            });
        }

        return this.state.gotSubmissions ? (
            <Dialog
                fullWidth={true}
                maxWidth={"md"}
                open={this.props.open}
                onClose={this.props.onClickAway}
                contentStyle={{
                    minWidth: "30vw",
                    padding: "5em",
                    minHeight: "30vh",
                }}
            >
                {content}
            </Dialog>
        ) : (
            <LoadingBackdrop
                open={!this.state.gotSubmissions && this.props.open}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    classroomId: state.data.classroom.id,
    submissions: state.data.submissions,
});
const mapActionToProps = {
    getSubmissions,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(SubmissionsViewDialog));
