import React, { Component } from "react";
import "./billing_window.css";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateBillingDialog from '../dialogs/CreateBillingDialog';
import BillingTable from "../tables/BillingTable";

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 20,
    minWidth: '50%',
    minHeight: 572,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 8,
  },
  menu: {
    width: 160,
  },
  divider: {
    margin: 0,
    borderTop: '2px solid #444',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
}));

const countries =[
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'UK',
    label: 'UK'
  }
]

export default function BillingWindow() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    country: 'Japan',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

    return (
      <React.Fragment>
        <BillingTable />
        <div id="footer_billing">
          <hr id="border" className={ classes.input } />
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <CreateBillingDialog />
          </Box>
        </div>
      </React.Fragment>
    );
}
