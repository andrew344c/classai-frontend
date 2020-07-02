import React, { Component } from "react";

// Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    card: {
        display: "flex",
        backgroundColor: "#eeeeee",
        marginBottom: "1em",
    },
    button: {
        marginTop: "1em"
    }
});

class ClassroomDisplay extends Component {

    handle = () => {
        this.refs.fileUploader.click();
    }

    render() {
        //const { classes, classroom: {name, assignments, description, teachers, students}} = this.props;
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5">Introduce yourself!</Typography>
                    <Typography variant="body2" color="textSecondary">
                        an hour ago
                    </Typography>
                    <Typography variant="body1">
                        In this assignment, just simply introduce who you are!
                        For example, I am Andrew and I like to go biking.
                    </Typography>
                    <Typography variant="h6">
                        In this assignment, just simply introduce who you are!
                        For example, I am Andrew and I like to go biking.
                    </Typography>
                    <input type="file" id="file" ref="fileUploader" style={{display: "none"}}/>
                    <button className={classes.button} onClick={this.handle}>Upload</button>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(ClassroomDisplay);
