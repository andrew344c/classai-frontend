import React, { Component } from 'react';

import { Drawer } from '@material-ui/core';

// Redux
import { connect } from "react-redux";
import { toggleDrawer } from "../../redux/actions/uiActions";


const mapStateToProps = (state) => ({
    open: state.ui.drawerOpen
});

class ClassNavDrawer extends Component {

    componentDidMount() {

    }

    render() {
        console.log("rendering with visibility " + this.props.open);
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

export default connect(mapStateToProps, { toggleDrawer })(ClassNavDrawer);