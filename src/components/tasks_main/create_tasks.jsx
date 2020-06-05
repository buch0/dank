import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import MaterialUIPickers from '../pickers/MaterialUIPickers';
import ReactDateTimePicker from '../pickers/ReactDateTimePicker';
import TaskProfilesDialog from '../dialogs/TaskProfilesDialog';
import TaskProfiles from './TaskProfiles';
import { DoCreateTask } from "../tables/TasksTable";
import './style.css';
import './react-datetime.css';

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  paper: {
    width: 900
  },
  ccmy: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 100
  },
  buttons: {
    textAlign: "center"
  }
}));

const website = [
  {
    value: "abc mart",
    label: "abc mart"
  },
  {
    value: "Adidas JP",
    label: "Adidas JP"
  },
  {
    value: "arktz",
    label: "arktz"
  },
  {
    value: "Atmos Tokyo",
    label: "Atmos Tokyo"
  },
  {
    value: "Bape JP",
    label: "Bape JP"
  },
  {
    value: "billy’s",
    label: "billy’s"
  },
  {
    value: "CJ Mart",
    label: "CJ Mart"
  },
  {
    value: "Gallery2",
    label: "Gallery2"
  },
  {
    value: "Instants",
    label: "Instants"
  },
  {
    value: "Isetan",
    label: "Isetan"
  },
  {
    value: "Mita Sneakers",
    label: "Mita Sneakers"
  },
  {
    value: "Mortar",
    label: "Mortar"
  },
  {
    value: "NBHD",
    label: "NBHD"
  },
  {
    value: "Parksider",
    label: "Parksider"
  },
  {
    value: "RAKUTEN",
    label: "RAKUTEN"
  },
  {
    value: "Reebok JP",
    label: "Reebok JP"
  },
  {
    value: "Sacai",
    label: "Sacai"
  },
  {
    value: "SNKRS JP",
    label: "SNKRS JP"
  },
  {
    value: "Soph Online",
    label: "Soph Online"
  },
  {
    value: "Spotaka",
    label: "Spotaka"
  },
  {
    value: "Supreme JP",
    label: "Supreme JP"
  },
  {
    value: "Tyron",
    label: "Tyron"
  },
  {
    value: "Ugshaft",
    label: "Ugshaft"
  },
  {
    value: "Undefeated JP",
    label: "Undefeated JP"
  },
  {
    value: "Xebio online",
    label: "Xebio online"
  },
  {
    value: "Yahoo Shopping",
    label: "Yahoo Shopping"
  },
  {
    value: "Yamaotoko",
    label: "Yamaotoko"
  },
  {
    value: "Zozotown",
    label: "Zozotown"
  }
];

const proxylist = [{}];
export default function CreateTasks(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    // name: 'Cat in the Hat',
    // age: '',
    // multiline: 'Controlled',
    shipbill: "True",
    website: '',
    keywords: '',
    size: '',
    style: '',
    date: '',
    profiles: {
      checkOutProxy: 'checkout da',
      monitorProxy: 'monitor da',
      billing: 'billing da',
      account: 'billing da',
    },
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  const handleChangedDate = (date) => {
    values.date = date;
  };

  const handleClickCreate = () => {
    props.handleClose();
    
    // do something
    DoCreateTask(values.website, values.keywords, values.size, values.style, values.date.format("YYYY-MM-DD HH:mm:ss"));
  };

  const addMB = (bottom = 16) => { return (<div style={{ marginBottom: bottom }}></div>); };

  return (
    <Paper className={classes.paper}>
      <h4 style={{ textAlign: "center" }}> Create Tasks</h4>
      <h5 style={{ textAlign: "center" }}> Task Information</h5>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-select"
          select
          label="Website"
          className={classes.textField}
          value={values.website}
          onChange={handleChange("website")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select the website"
          margin="normal"
        >
          {website.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/*
        <TextField
          id="standard-select"
          select
          label="Monitor Proxy"
          className={classes.textField}
          value={values.proxylist}
          onChange={handleChange("proxylist")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select a proxy list"
          margin="normal"
        >
          {proxylist.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select"
          select
          label="Checkout Proxy"
          className={classes.textField}
          value={values.proxylist}
          onChange={handleChange("proxylist")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select a proxy list"
          margin="normal"
        >
          {proxylist.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        */}
        <TextField
          required
          label="Keywords, URLs"
          className={classes.textField}
          value={values.keywords}
          onChange={handleChange("keywords")}
          margin="normal"
        />
        <TextField
          required
          label="Size"
          className={classes.textField}
          value={values.size}
          onChange={handleChange("size")}
          margin="normal"
        />
        <TextField
          required
          label="Style"
          className={classes.textField}
          value={values.style}
          onChange={handleChange("style")}
          margin="normal"
        />
        { addMB(20) }
        <div className="text-center">
          <TaskProfiles />
          { addMB(20) }
          <Button>Options</Button>
        </div>
        { addMB(1) }
        <ReactDateTimePicker values={ values } handleChangedDate={ handleChangedDate }/>
        { addMB(30) }
        <div id="buttons">
          <Button id="cacnel" onClick={props.handleClose}>Close</Button>
          <Button id="#save" onClick={handleClickCreate}>Create</Button>
        </div>
      </form>
    </Paper>
  );
}
