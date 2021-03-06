// React
import React, { Component } from "react";

// React Router
import {
    //Router,
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

import jwtDecode from "jwt-decode";

// Views
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Classroom from "./pages/Classroom";
import AssignmentDashboard from "./pages/AssignmentDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Grades from "./pages/Grades";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

// Assets
import logo from "./logo.svg";
import "./App.css";

// Axios
import axios from "axios";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = "http://localhost:5000/classai/us-central1/api";
} else {
    axios.defaults.baseURL =
        "https://us-central1-classai.cloudfunctions.net/api";
}

let token = localStorage.getItem("JWToken");
if (token) {
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch({ type: SET_AUTHENTICATED, payload: { authVal: true } });
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route
                            exact
                            path="/classroom/:classroomId"
                            component={Classroom}
                        />
                        <Route
                            exact
                            path="/classroom/:classroomId/assignment/:assignmentId"
                            component={AssignmentDashboard}
                        />
                        <Route
                            exact
                            path="/forgot"
                            component={ForgotPassword}
                        />
                        <Route exact path="/grades" component={Grades} />
                        <Route exact path="/settings" component={Settings} />
                        <Route
                            exact
                            path="/profile/:username"
                            component={Profile}
                        />

                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
