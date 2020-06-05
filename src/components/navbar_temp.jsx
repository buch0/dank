import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./navbar.css";
import TasksWindow from "./tasks_main/tasks_window";
import ProfilesWindow from "./profiles_main/profiles_window";
import SettingsWindow from "./settings_main/settings_window";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <ul className="navbar-nav">
            <li className="nav-item" id="task">
              <Link to={"/tasks_main"} className="nav-link">
                TASKS
              </Link>
            </li>
            <li className="nav-item" id="prof">
              <Link to={"/profiles_main"} className="nav-link">
                PROFILES
              </Link>
            </li>
            <li className="nav-item" id="set">
              <Link to={"/settings_main"} className="nav-link">
                SETTINGS
              </Link>
            </li>
          </ul>
        </nav>
        <hr id="border" />
        <Switch>
          <Route exact path="/tasks_main" component={TasksWindow} />
          <Route path="/profiles_main" component={ProfilesWindow} />
          <Route path="/settings_main" component={SettingsWindow} />
        </Switch>
      </Router>
    );
  }
}

export default NavBar;
