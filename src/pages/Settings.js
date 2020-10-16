import React, { Component, Fragment } from "react";
import Navbar from "../components/Navigation/Navbar";
import ProfileSettings from "../components/Profile/ProfileSettings";

export default class Settings extends Component {
    render() {
        return (
            <Fragment>
                <Navbar />
                <ProfileSettings />
            </Fragment>
        );
    }
}
