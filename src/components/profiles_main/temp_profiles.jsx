import React, { Component } from "react";
import "./profiles_window.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AddProfile from "./add_profile";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  button: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row"
  },
  input: {
    display: "none"
  }
}));

export class ProfilesWindow extends Component {
  state = {
    isOpen: false
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className="status_bar">
          <div className="row">
            <div className="col-s" id="profileNo">
              No.
            </div>
            <div className="col-sm" id="profileName">
              Profile Name
            </div>
            <div className="col-sm" id="address1">
              Address1
            </div>
            <div className="col-sm" id="address2">
              Address 2
            </div>
            <div className="col-sm" id="address3">
              Address 3
            </div>
            <div className="col-sm" id="email">
              Email
            </div>
            <div className="col-sm" id="phone">
              Phone Number
            </div>
            <div className="col-sm" id="select">
              Select
            </div>
          </div>
          <hr id="border" />
        </div>

        <div id="footer_profile">
          <hr id="border" />
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Button
              style={{
                maxWidth: "280px",
                maxHeight: "40px",
                minWidth: "280px",
                minHeight: "40px",
                margin: "5px"
              }}
              variant="outlined"
              className="{classes.button}"
              id="addprofile"
            >
              {" "}
              Add Profile
            </Button>

            <input
              accept="json/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{
                  maxWidth: "280px",
                  maxHeight: "40px",
                  minWidth: "280px",
                  minHeight: "40px",
                  margin: "5px"
                }}
                variant="outlined"
                component="span"
                className="{classes.button}"
                id="import"
              >
                {" "}
                Import Profile
              </Button>
            </label>

            <input
              accept="json/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                style={{
                  maxWidth: "280px",
                  maxHeight: "40px",
                  minWidth: "280px",
                  minHeight: "40px",
                  margin: "5px"
                }}
                variant="outlined"
                component="span"
                className="{classes.button}"
                id="export"
              >
                {" "}
                Export Profile
              </Button>
            </label>
            <Button
              style={{
                maxWidth: "280px",
                maxHeight: "40px",
                minWidth: "280px",
                minHeight: "40px",
                margin: "5px"
              }}
              variant="outlined"
              className="{classes.button}"
              id="deleteall"
            >
              {" "}
              Delete All
            </Button>
          </Box>
        </div>
      </React.Fragment>
    );
  }
}
ProfilesWindow.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(useStyles)(ProfilesWindow);
