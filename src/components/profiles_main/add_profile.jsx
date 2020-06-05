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
import "./add_profile.css";

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

const countries = [
  {
    value: "Japan",
    label: "日本"
  }
];
const cardtype = [
  {
    value: "Visa",
    label: "Visa"
  },
  {
    value: "Master",
    label: "Master"
  },
  {
    value: "Amex",
    label: "Amex"
  },
  {
    value: "JCB",
    label: "JCB"
  },
  {
    value: "Diners",
    label: "Diners"
  }
];
const shipbill = [
  {
    value: "True",
    label: "True"
  },
  {
    value: "False",
    label: "False"
  }
];
const month = [
  {
    value: "01",
    label: "01"
  },
  {
    value: "02",
    label: "02"
  },
  {
    value: "03",
    label: "03"
  },
  {
    value: "04",
    label: "04"
  },
  {
    value: "05",
    label: "05"
  },
  {
    value: "06",
    label: "06"
  },
  {
    value: "07",
    label: "07"
  },
  {
    value: "08",
    label: "08"
  },
  {
    value: "09",
    label: "09"
  },
  {
    value: "10",
    label: "10"
  },
  {
    value: "11",
    label: "11"
  },
  {
    value: "12",
    label: "12"
  }
];
const year = [
  {
    value: "19",
    label: "19"
  },
  {
    value: "20",
    label: "20"
  },
  {
    value: "21",
    label: "21"
  },
  {
    value: "22",
    label: "22"
  },
  {
    value: "23",
    label: "23"
  },
  {
    value: "24",
    label: "24"
  },
  {
    value: "25",
    label: "25"
  },
  {
    value: "26",
    label: "26"
  },
  {
    value: "27",
    label: "27"
  },
  {
    value: "28",
    label: "28"
  },
  {
    value: "29",
    label: "29"
  },
  {
    value: "30",
    label: "30"
  }
];
const prefectures = [
  {
    value: "Aichi",
    label: "愛知県"
  },
  {
    value: "Akita",
    label: "秋田県"
  },
  {
    value: "Aomori",
    label: "青森県"
  },
  {
    value: "Chiba",
    label: "千葉県"
  },
  {
    value: "Ehime",
    label: "愛媛県"
  },
  {
    value: "Fukui",
    label: "福井県"
  },
  {
    value: "Fukuoka",
    label: "福岡県"
  },
  {
    value: "Fukushima",
    label: "福島県"
  },
  {
    value: "Gifu",
    label: "岐阜県"
  },
  {
    value: "Gunma",
    label: "群馬県"
  },
  {
    value: "Hiroshima",
    label: "広島県"
  },
  {
    value: "Hokkaido",
    label: "北海道"
  },
  {
    value: "Hyōgo",
    label: "兵庫県"
  },
  {
    value: "Ibaraki",
    label: "茨城県"
  },
  {
    value: "Ishikawa",
    label: "石川県"
  },
  {
    value: "Iwate",
    label: "岩手県"
  },
  {
    value: "Kagawa",
    label: "香川県"
  },
  {
    value: "Kagoshima",
    label: "鹿児島県"
  },
  {
    value: "Kanagawa",
    label: "神奈川県"
  },
  {
    value: "Kōchi",
    label: "高知県"
  },
  {
    value: "Kumamoto",
    label: "熊本県"
  },
  {
    value: "Kyoto",
    label: "京都府"
  },
  {
    value: "Mie",
    label: "三重県"
  },
  {
    value: "Miyagi",
    label: "宮城県"
  },
  {
    value: "Miyazaki",
    label: "宮崎県"
  },
  {
    value: "Nagano",
    label: "長野県"
  },
  {
    value: "Nagasaki",
    label: "長崎県"
  },
  {
    value: "Nara",
    label: "奈良県"
  },
  {
    value: "Niigata",
    label: "新潟県"
  },
  {
    value: "Ōita",
    label: "大分県"
  },
  {
    value: "Okayama",
    label: "岡山県"
  },
  {
    value: "Okinawa",
    label: "沖縄県"
  },
  {
    value: "Osaka",
    label: "大阪府"
  },
  {
    value: "Saga",
    label: "佐賀県"
  },
  {
    value: "Saitama",
    label: "埼玉県"
  },
  {
    value: "Shiga",
    label: "滋賀県"
  },
  {
    value: "Shimane",
    label: "島根県"
  },
  {
    value: "Shizuoka",
    label: "静岡県"
  },
  {
    value: "Tochigi",
    label: "栃木県"
  },
  {
    value: "Tokushima",
    label: "徳島県"
  },
  {
    value: "Tokyo",
    label: "東京都"
  },
  {
    value: "Tottori",
    label: "鳥取県"
  },
  {
    value: "Toyama",
    label: "富山県"
  },
  {
    value: "Wakayama",
    label: "和歌山県"
  },
  {
    value: "Yamagata",
    label: "山形県"
  },
  {
    value: "Yamaguchi",
    label: "山口県"
  },
  {
    value: "Yamanashi",
    label: "山梨県"
  }
];

export default function AddProfile(props) {
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
      <h4 style={{ textAlign: "center" }}> ADD PROFILE</h4>
      <h5 style={{ textAlign: "center" }}> Billing Address</h5>
      <form className={classes.container} noValidate autoComplete="off">
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
          id="standard-select-country"
          select
          label="Country"
          className={classes.textField}
          value={values.countries}
          onChange={handleChange("countries")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your country"
          margin="normal"
        >
          {countries.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-prefecture"
          select
          label="Prefectures"
          className={classes.textField}
          value={values.prefectures}
          onChange={handleChange("prefectures")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your prefectures"
          margin="normal"
        >
          {prefectures.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
        <TextField
          id="standard-select"
          select
          label="Shipping same as Billing "
          className={classes.textField}
          value={values.shipbill}
          onChange={handleChange("shipbill")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Is shipping same as billing?"
          margin="normal"
        >
          {shipbill.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
          id="standard-select"
          select
          label="Card Type"
          className={classes.ccmy}
          value={values.cardtype}
          onChange={handleChange("cardtype")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {cardtype.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
          id="standard-select"
          select
          label="Exp Month"
          className={classes.ccmy}
          value={values.month}
          onChange={handleChange("month")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {month.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select"
          select
          label="Exp Year"
          className={classes.ccmy}
          value={values.year}
          onChange={handleChange("year")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          margin="normal"
        >
          {year.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
