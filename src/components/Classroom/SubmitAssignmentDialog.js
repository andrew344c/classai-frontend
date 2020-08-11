import React, { Component } from "react";

import { connect } from "react-redux";
import { uploadSubmission } from "../../redux/actions/userActions";
import { getSubmissions } from "../../redux/actions/dataActions";

import { Dialog, Button, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import "./SubmitAssignmentDialog.scss";

const styles = (theme) => ({
    paper: {
        marginBottom: 20,
    },
    img: {
        width: "100%",
        height: "auto",
    },
});

class SubmitAssignmentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileSubmit = () => {
        const formData = new FormData();
        formData.append(
            "submission",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        this.props.uploadSubmission(
            formData,
            this.props.classroomId,
            this.props.assignmentId
        );
    };

    getSubmissions = () => {
        this.props.getSubmissions(
            this.props.classroomId,
            this.props.assignmentId
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.open} onClose={this.props.onClickAway}>
                <button onClick={this.getSubmissions}>Get submissions</button>
                {this.props.submissions.map((submission) => {
                    console.log(submission);
                    return (
                        <Paper className={classes.paper}>
                            <Typography variant="h4">{`${submission.creator.firstName} ${submission.creator.lastName}`}</Typography>
                            <img
                                src={submission.downloadUrl}
                                key={submission.id}
                                className={classes.img}
                                alt="submission"
                            />
                            <Typography>{`Text Derived From OCR: ${submission.text}`}</Typography>
                            <Typography>{`Similar Websites to Submission: ${submission.plagarismLinks}`}</Typography>
                        </Paper>
                    );
                })}
                <form id="file-upload-form" className="uploader">
                    <input
                        id="file-upload"
                        type="file"
                        name="submission"
                        accept="image/*"
                        onChange={this.onFileChange}
                    />

                    <label htmlFor="file-upload" id="file-drag">
                        <img
                            id="file-image"
                            src="#"
                            alt="Preview"
                            className="hidden"
                        />
                        <div id="start">
                            <i
                                className="fa fa-download"
                                aria-hidden="true"
                            ></i>
                            <div>Select a file or drag here</div>
                            <div id="notimage" className="hidden">
                                Please select an image
                            </div>
                            <span
                                id="file-upload-btn"
                                className="btn btn-primary"
                            >
                                Select a file
                            </span>
                        </div>
                        <div id="response" className="hidden">
                            <div id="messages"></div>
                            <progress
                                className="progress"
                                id="file-progress"
                                value="0"
                            >
                                <span>0</span>%
                            </progress>
                        </div>
                    </label>
                    <Button onClick={this.onFileSubmit}>Submit</Button>
                </form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    classroomId: state.data.classroom.id,
    submissions: state.data.submissions,
});

const mapActionToProps = {
    uploadSubmission,
    getSubmissions,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(withStyles(styles)(SubmitAssignmentDialog));
