import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    height: 500,
  },
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
];

const checkoutProxyprofiles =[
  {
    value: '192.168.0.1:8080',
    label: '192.168.0.1:8080',
  },
  {
    value: '192.168.55.1:12121',
    label: '192.168.55.1:12121',
  },
];

// dankオブジェクトから取得する
const profileList = { 
  checkoutProxies: [
    {
      value: '192.168.0.1:8080',
      label: '192.168.0.1:8080',
    },
    {
      value: '192.168.55.1:12121',
      label: '192.168.55.1:12121',
    },
  ],
  monitorProxies: [
    {
      value: '192.168.0.1:8080',
      label: '192.168.0.1:8080',
    },
    {
      value: '192.168.55.1:12121',
      label: '192.168.55.1:12121',
    },
  ],
  accounts: [
    {
      value: '192.168.0.1:8080',
      label: '192.168.0.1:8080',
    },
    {
      value: '192.168.55.1:12121',
      label: '192.168.55.1:12121',
    },
  ],
  billing: [
    {
      value: '192.168.0.1:8080',
      label: '192.168.0.1:8080',
    },
    {
      value: '192.168.55.1:12121',
      label: '192.168.55.1:12121',
    },
  ],
};

const updateProfileList = (props) => {

  profileList.checkoutProxies.splice(0, profileList.checkoutProxies.length);
  profileList.monitorProxies.splice(0, profileList.monitorProxies.length);
  profileList.accounts.splice(0, profileList.accounts.length);
  profileList.billing.splice(0, profileList.billing.length);

  // データが重複するので、作成時に値の重複をチェックし、重複がないようにする。
  const dank_proxies = window.core.proxy.getAll();
  const dank_accounts = window.core.account.getAll();
  const dank_billing = window.core.billing.getAll();

  const arr1 = dank_proxies.filter(function(v1,i1,a1){ 
    return (a1.findIndex(function(v2){
      let flag1 = false, flag2 = false;

      Object.getOwnPropertyNames(v1.websites).map(v => {
        if(v === props.values.website && v1.websites[v]) {
          flag1 = true;
          return true;
        }
      });

      Object.getOwnPropertyNames(v2.websites).map(v => {
        if(v === props.values.website && v1.websites[v]) {
          flag2 = true;
          return true;
        }
      });

      return (flag1 && flag2 && v1.type===v2.type && v1.ip===v2.ip && v1.port===v2.port && v1.username===v2.username && v1.password===v2.password) 
    }) === i1);
  });

  const arr2 = dank_accounts.filter(function(v1,i1,a1){ 
    return (a1.findIndex(function(v2){
      let flag1 = false, flag2 = false;

      Object.getOwnPropertyNames(v1.websites).map(v => {
        if(v === props.values.website && v1.websites[v]) {
          flag1 = true;
          return true;
        }
      });

      Object.getOwnPropertyNames(v2.websites).map(v => {
        if(v === props.values.website && v1.websites[v]) {
          flag2 = true;
          return true;
        }
      });

      return (flag1 && flag2 && v1.email===v2.email && v1.password===v2.password) 
    }) === i1);
  });

  const arr3 = dank_billing.filter(function(v1,i1,a1){ 
    return (a1.findIndex(function(v2){
      let flag1 = false, flag2 = false;

      return (v1.profile===v2.profile && v1.email===v2.email && v1.cardHolder===v2.cardHolder && v1.cardNumber ===v2.cardNumber) 
    }) === i1);
  });

  arr1.forEach(v => {
    if(v.type === 'Checkout') {
      profileList.checkoutProxies.push({value: v.ip + ':' + v.port, label: v.ip + ':' + v.port});
    } else {
      profileList.monitorProxies.push({value: v.ip + ':' + v.port, label: v.ip + ':' + v.port});
    }
  });

  arr2.forEach(v => {
    profileList.accounts.push({ value: v.email + ':' + v.password, label: v.email + ':' + v.password});
  });

  arr3.forEach(v => {
    profileList.billing.push({ value: v.profile, label: v.profile});
  });
};
export default function TaskProfiles(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState(props.values.profiles);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  if(props.setProfilesValues !== undefined) {
    props.setProfilesValues(values);
  }
  
  updateProfileList(props);
  return (
    <div>
        <TextField
          select
          label="Checkout Proxy"
          className={classes.textField}
          value={values.checkoutProxy}
          onChange={handleChange("checkoutProxy")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select a checkout proxy"
          margin="normal"
          style={values.state_disabled ? { pointerEvents: "none" } : {}}
          disabled={values.state_disabled}
        >
          {profileList.checkoutProxies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Monitor Proxy"
          className={classes.textField}
          value={values.monitorProxy}
          onChange={handleChange("monitorProxy")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select a monitor proxy"
          margin="normal"
          style={values.state_disabled ? { pointerEvents: "none" } : {}}
          disabled={values.state_disabled}
        >
          {profileList.monitorProxies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Account"
          className={classes.textField}
          value={values.account}
          onChange={handleChange("account")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select an account"
          margin="normal"
          style={values.state_disabled ? { pointerEvents: "none" } : {}}
          disabled={values.state_disabled}
        >
          {profileList.accounts.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Billing"
          className={classes.textField}
          value={values.billing}
          onChange={handleChange("billing")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select a billing"
          margin="normal"
          style={values.state_disabled ? { pointerEvents: "none" } : {}}
          disabled={values.state_disabled}
        >
          {profileList.billing.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
  );
}