// React
import React, { Component } from 'react'

// React Router
import { Link } from "react-router-dom"

// Material UI
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"
import { Toolbar } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"

// Redux
import { connect } from "react-redux"
import { toggleDrawer } from "../../redux/actions/uiActions"

const styles = (theme) => ({
    appBar: {
        backgroundColor: "white",
    },
    title: {
        paddingLeft: "1em",
        color: "black",
    },
    leftmostRightGroupButton: {
        marginLeft: "auto"
    }
});

class Navbar extends Component {
    render() {

        const { classes } = this.props;

        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton onClick={this.props.toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <Typography className={classes.title} variant="h5">
                            ClassAI
                        </Typography>
                    </Link>
                    <Button className={classes.leftmostRightGroupButton}>Login</Button>
                    <Button>Signup</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(null, { toggleDrawer })(withStyles(styles)(Navbar));