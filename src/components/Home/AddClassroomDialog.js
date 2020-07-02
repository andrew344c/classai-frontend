import React, { Component } from "react";

// Material UI
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { connect } from "react-redux";
import { joinClassroom } from "../../redux/actions/userActions";

class AddClassroomDialog extends Component {
    constructor() {
        super();
        this.state = {
            classroomId: "",
            open: false,
            joiningClassroom: true
        };
    }

    onChange = (event) => {
        event.persist();
        event.preventDefault();
        this.setState((oldState) => ({
            ...oldState,
            [event.target.name]: event.target.value,
        }));
    };

    onClick = () => {
        this.setState((oldState) => ({
            ...oldState,
            open: !oldState.open,
        }));
    };

    onClickAway = () => {
        this.setState((oldState) => ({
            ...oldState,
            open: false,
        }));
    };

    onSubmit = () => {
        this.onClickAway();
        this.props.joinClassroom(this.state.classroomId);
    };

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.onClick}
                >
                    <AddIcon />
                    <Typography variant="body3">
                        Join or create a classroom
                    </Typography>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClickAway}
                    aria-labelledby="form-dialog-title"
                >
                    {}
                    <DialogTitle id="form-dialog-title">Join Class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To join a classroom, please enter the classroom id.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="classroomId"
                            label="Classroom Id"
                            type="classroomId"
                            name="classroomId"
                            onChange={this.onChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClickAway} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapActionToProps = {
    joinClassroom,
};

export default connect(null, mapActionToProps)(AddClassroomDialog);
