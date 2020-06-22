import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Navbar from "./components/Navbar"

import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {

        return (
            <Router>
                <Navbar dankness="asd" />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/signup" component={ Signup } />
                </Switch>
            </Router>
        )
        


    }
}

export default App;
