import React, { Component, Fragment } from "react";

// Material UI
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Redux
import { connect } from "react-redux";
import { createAssignment } from "../../../redux/actions/userActions";

class CreateAssignmentDialog extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            description: "",
            open: false,
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
        this.props.createAssignment(
            {
                name: this.state.name,
                description: this.state.description,
                dueDate: 0, // temporary
            },
            this.props.classroomId
        );
        this.setState(() => ({
            name: "",
            description: "",
            open: false,
        }));
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
                    <Typography>Create an assignment</Typography>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClickAway}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create an assignment
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create an assignment, please enter a name and
                            description for the assignment.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Assignment Name"
                            type="name"
                            name="name"
                            onChange={this.onChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Assignment Description"
                            name="description"
                            onChange={this.onChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClickAway} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    classroomId: state.data.classroom.id,
});

const mapActionToProps = {
    createAssignment,
};

export default connect(
    mapStateToProps,
    mapActionToProps
)(CreateAssignmentDialog);
