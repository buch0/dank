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
import "./add_task.css";

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
export default function AddTask(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    // name: 'Cat in the Hat',
    // age: '',
    // multiline: 'Controlled',
    shipbill: "True"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Paper className={classes.paper}>
      <h4 style={{ textAlign: "center" }}> ADD TASK</h4>
      <h5 style={{ textAlign: "center" }}> Task Information</h5>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-select"
          select
          label="Websites"
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
        <TextField
          required
          id="standard-required"
          label="Profile Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="姓"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="名"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="フリガナ　セイ"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="フリガナ　メイ"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="Email"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-required"
          label="Phone Number"
          className={classes.textField}
          type="Phone number"
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="市区郡"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("city")}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="町名"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("cho")}
          margin="normal"
        />
        <TextField
          required
          id="standard-required"
          label="番地"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("banchi")}
          margin="normal"
        />
        <TextField
          id="standard-textarea"
          label="建物名・号室"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("building")}
          margin="normal"
        />

        <TextField
          id="standard-helperText"
          label="Zip Code"
          className={classes.textField}
          helperText="without the -"
          margin="normal"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Checkout Method</FormLabel>
          <RadioGroup
            aria-label="position"
            name="position"
            values={values}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="代引"
              control={<Radio color="default" />}
              label="代引"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Credit Card"
              control={<Radio color="default" />}
              label="Credit Card"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="standard-textarea"
          label="Credit Card Number"
          className={classes.textField}
          value={values.name}
          type="number"
          onChange={handleChange("cardnum")}
          margin="normal"
        />
        <TextField
          id="standard-textarea"
          label="Card Holder Name"
          className={classes.textField}
          value={values.name}
          onChange={handleChange("cardname")}
          margin="normal"
        />

        <TextField
          id="standard-textarea"
          label="CCV"
          className={classes.ccmy}
          value={values.name}
          type="ccv"
          onChange={handleChange("ccv")}
          margin="normal"
        />
        <div id="buttons">
          <Button id="cacnel">Cancel</Button>
          <Button id="#save">Save</Button>
        </div>
      </form>
    </Paper>
  );
}
