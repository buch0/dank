import React, { Component } from "react";
import "./tasks_window.css";
import "./single_task";
import "./create_tasks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import CreateTasksDialog from '../dialogs/CreateTasksDialog';
import TasksTable from "../tables/TasksTable";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function getModalStyle() {
  const top = 12;
  const left = 20;

  return {
    justifyContent: "center",
    // top: `${top}%`,
    // left: `${left}%`,
    transform: `translate(${top}%, ${left}%)`
  };
}

export default function TasksWindow() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
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
          <div className="col-1" id="tasks_taskNo">
            Task No.
          </div>
          <div className="col-sm" id="tasks_website">
            Website
          </div>
          <div className="col-sm" id="tasks_product">
            Product
          </div>
          <div className="col-sm" id="tasks_size">
            Size
          </div>
          <div className="col-sm" id="tasks_style">
            Style
          </div>
          <div className="col-sm" id="tasks_startTime">
            Start Time
          </div>
          <div className="col-sm" id="tasks_proxies">
            Proxies
          </div>
          <div className="col-sm" id="tasks_status">
            Status
          </div>
          <div className="col-sm" id="tasks_actions">
            Actions
          </div>
        </div>
        <hr id="border" />
      </div>
      */}
      <TasksTable />
      <div id="footer_task">
        <hr id="border" />
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <CreateTasksDialog />
          <Button
            style={{
              maxWidth: "220px",
              maxHeight: "40px",
              minWidth: "220px",
              minHeight: "40px",
              margin: "5px"
            }}
            variant="outlined"
            className="{classes.button}"
            id="addtask"
          >
            {" "}
            Mass Edit
          </Button>
          <Button
            style={{
              maxWidth: "220px",
              maxHeight: "40px",
              minWidth: "220px",
              minHeight: "40px",
              margin: "5px"
            }}
            variant="outlined"
            className="{classes.button}"
            id="addtask"
          >
            {" "}
            Start All
          </Button>
          <Button
            style={{
              maxWidth: "220px",
              maxHeight: "40px",
              minWidth: "220px",
              minHeight: "40px",
              margin: "5px"
            }}
            variant="outlined"
            className="{classes.button}"
            id="addtask"
          >
            {" "}
            Stop All
          </Button>
          <Button
            style={{
              maxWidth: "220px",
              maxHeight: "40px",
              minWidth: "220px",
              minHeight: "40px",
              margin: "5px"
            }}
            variant="outlined"
            className="{classes.button}"
            id="addtask"
          >
            {" "}
            Delete All
          </Button>
        </Box>
      </div>
    </React.Fragment>
  );
}
