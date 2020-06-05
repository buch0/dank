import React, { Component } from "react";
import "./proxies_window.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import ProxiesTable from "../tables/ProxiesTable";
import CreateProxiesDialog from "../dialogs/CreateProxiesDialog";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

export default function ProxiesWindow() {
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/*
      <div className="status_bar">
        <div className="row">
          <div className="col-1" id="proxies_proxyNo">
            Proxy No.
          </div>
          <div className="col-sm" id="proxies_webSite">
            Website
          </div>
          <div className="col-sm" id="proxies_ip">
            IP
          </div>
          <div className="col-sm" id="proxies_port">
            Port
          </div>
          <div className="col-sm" id="proxies_userName">
            Username
          </div>
          <div className="col-sm" id="proxies_password">
            Password
          </div>
          <div className="col-sm" id="proxies_speed">
            Speed
          </div>
          <div className="col-sm" id="proxies_actions">
            Actions
          </div>
        </div>
        <hr id="border" />
      </div>
      */}
      <ProxiesTable />
      <div id="footer_proxy">
        <hr id="border" />
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <CreateProxiesDialog />
        </Box>
      </div>
    </React.Fragment>
  );
}

