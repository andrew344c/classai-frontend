import React, { Component } from 'react'

import "./Navbar.css"

import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import { Toolbar } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    appBar: {
        backgroundColor: "white",
    },
    title: {
        paddingLeft: "1em",
        color: "black",
        flexGrow: 1
    }
});

class Navbar extends Component {

    render() {

        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton>
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h5">
                        ClassAI
                    </Typography>
                    <Button>Login</Button>
                    <Button>Signup</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Navbar);