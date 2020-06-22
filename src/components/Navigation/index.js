import React, { Component, Fragment } from 'react';

import ClassNavDrawer from "./ClassNavDrawer";
import Navbar from "./Navbar";

export default class Navigation extends Component {
    render() {
        return (
            <Fragment>
                <ClassNavDrawer />
                <Navbar />
            </Fragment>
        )
    }
}
