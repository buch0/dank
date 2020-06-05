import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./navbar.css";
import TasksWindow from "./tasks_main/tasks_window";
import ProxiesWindow from  "./proxies_main/proxies_window";
import BillingWindow from "./billing_main/billing_window";
import AccountsWindow from "./accounts_main/accounts_window";
import SettingsWindow from "./settings_main/settings_window";

import ProfilesWindow from "./profiles_main/profiles_window";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
    height: 30
  },
  indicator: {
    backgroundColor: "#ff3b4e"
  }
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    borderRadius: 3,
    border: 0,
    color: "black",
    height: 30,
    fontSize: 20,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji"
    ].join(","),

    "&:hover": {
      color: "#b3b3b3",
      opacity: 1
    },
    "&$selected": {
      color: "#b3b3b3"
    },
    "&:focus": {
      color: "#b3b3b3"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    background: "white"
  },
  MuiAppBar: {
    color: "#212529",
    background: "#ffffff"
  }
}));

const util = window.util; // declare
const sys = window.core;

export default function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);

    //test();
  }

  return (
    <div className={classes.root}>
      <Router>
        <AntTabs variant="fullWidth" value={value} onChange={handleChange}>
          <AntTab label="Tasks" component={Link} to="/tasks_main" />
          <AntTab label="Proxies" component={Link} to="/proxies_main" />
          <AntTab label="Billing" component={Link} to="/billing_main" />
          <AntTab label="Accounts" component={Link} to="/accounts_main" />
          <AntTab label="Settings" component={Link} to="/settings_main" />
        </AntTabs>

        <Switch>
          <Route exact path="/tasks_main" component={TasksWindow} />
          <Route path="/proxies_main" component={ProxiesWindow} />
          <Route path="/billing_main" component={BillingWindow} />
          <Route path="/accounts_main" component={AccountsWindow} />
          <Route path="/settings_main" component={SettingsWindow} />
        </Switch>
      </Router>
    </div>
  );
}
