import React, { Component } from "react";

import Logo from "../assets/logofull.png";
import "./BetaHome.css"

export default class BetaHome extends Component {
    render() {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    textAlign: "center",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <div>
                    <img src={Logo} alt={"Nexus Logo"} />
                    <h1>Welcome to Nexus</h1>
                    <button className="betaButton"><span className="betaSpan">Get Started</span></button>
                    
                </div>
                <h3>Beta Testing</h3>
            </div>
        );
    }
}
