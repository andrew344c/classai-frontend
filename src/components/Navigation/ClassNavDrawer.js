import React, { Component } from 'react';

import { Drawer } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions/uiActions";


class ClassNavDrawer extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Drawer anchor="left" open={this.props.open} onClose={this.props.toggleDrawer}>
                <p>asdasdasd</p>
                <p>asdasdasd</p>
                <p>asdasdasd</p>
                <p>asdasdasd</p>
                <p>asdasdasd</p>
            </Drawer>
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.ui.drawerOpen
});

const mapActionsToProps = {
    toggleDrawer
}

export default connect(mapStateToProps, mapActionsToProps)(ClassNavDrawer);