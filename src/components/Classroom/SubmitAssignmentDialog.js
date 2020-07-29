import React, { Component } from "react";

import { connect } from "react-redux";
import { uploadSubmission } from "../../redux/actions/userActions";

import { Dialog, Button } from "@material-ui/core";

import "./SubmitAssignmentDialog.scss";

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
        console.log(this.state.selectedFile);
        formData.append("submission", this.state.selectedFile);
        this.props.uploadSubmission(
            formData,
            this.props.assignmentId,
            this.props.classroomId
        );
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClickAway}>
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
});

const mapActionToProps = {
    uploadSubmission,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(SubmitAssignmentDialog);
