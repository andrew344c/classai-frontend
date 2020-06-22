// React
import React, { Component } from "react";

// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Views
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import Navbar from "./components/Navbar";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store"

// Assets
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
