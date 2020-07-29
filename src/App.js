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
import Classroom from "./pages/Classroom"

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

// Assets
import logo from "./logo.svg";
import "./App.css";

// Axios
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/classai/us-central1/api";

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
                    {/**<Router history={history}> this shit keeps needing a refresh every redirect idk why */}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/classroom/:classroomId" component={Classroom} />

                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
