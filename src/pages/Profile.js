import React, { Component } from "react";
import Navbar from "../components/Navigation/Navbar";
import ProfileComponent from "../components/Profile/Profile";
export default class Profile extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <ProfileComponent />
            </div>
        );
    }
}
