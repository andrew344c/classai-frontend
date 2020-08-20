import React, { Component } from "react";

import { connect } from "react-redux";
import { uploadSubmission } from "../../redux/actions/userActions";
import { getSubmissions } from "../../redux/actions/dataActions";

import { Dialog, Button, Paper, Typography, Grid } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { withStyles } from "@material-ui/styles";


const styles = (theme) => ({
    paper: {
        marginBottom: 20,
        width: "100%"
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
        document.getElementById('upload').innerHTML = "File: " + event.target.files[0].name;
    };

    onFileSubmit = () => {
        const formData = new FormData();
        if(this.state.selectedFile != null) {
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
	        document.getElementById('right').style.display = "flex";
	        setTimeout(function() {
	        	document.getElementById('right').style.display = "none";
	        }, 3000);
	    }
	    else {
	    	document.getElementById('notright').style.display = "flex";
	    	setTimeout(function() {
	        	document.getElementById('notright').style.display = "none";
	        }, 3000);
	    }
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
            <div style={{width: "100%"}} open={this.props.open} onClose={this.props.onClickAway}>
                <div style={{display: "none"}}>
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
                </div>
            <Dialog open={this.props.open} onClose={this.props.onClickAway} contentStyle={{width: "100%", maxWidth: "none"}}>
                <div className={classes.root} style={{margin: 0, padding: 0, backgroundColor: "#e5e5e5", padding: "5%"}}>
                <Alert id="notright" style={{display: "none"}} variant="outlined" severity="error">Please upload a file before you submit</Alert>
                <Alert id="right" style={{display: "none"}} variant="outlined" severity="success">Your file has been submitted</Alert>
			      <Grid container spacing={3}>
				  	<Grid container item xs={12} spacing={3}>
				    	<Grid item xs={12}>
				          <p style={{textAlign: "center", fontFamily: "Roboto"}}><strong>SUBMIT YOUR WORK HERE</strong></p>
				        </Grid>
				        <Grid item xs={12}>
				        	<Button id="upload" onClick={openDialog} variant="contained" color="primary" style={{width: "100%"}}>+ Upload Files</Button>
				        </Grid>
				        <Grid item xs={6}>
				          <Button onClick={this.onFileSubmit} variant="contained" color="primary" style={{width: "100%"}}>Submit</Button>
				        </Grid>
				        <Grid item xs={6}>
				          <Button onClick={this.getSubmissions} variant="contained" color="primary" style={{width: "100%"}}>Get Submissions</Button>
				        </Grid>
				      </Grid>
				      <Grid item xs={12} spacing = {3}>
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
			      </Grid>
			      </Grid>
			    </div>
			  </Dialog>
			</div>
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

function openDialog() {
  document.getElementById('file-upload').click();
}
