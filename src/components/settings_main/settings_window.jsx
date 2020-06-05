import React, { Component } from "react";
import "./settings_window.css";

class SettingsWindow extends Component {
  state = {
    Settings_count: 0
  };

  render() {
    return (
      <React.Fragment>
        <div className="status_bar">
          <div className="col-s" id="welcome">
            Welcome .
          </div>
          <hr id="border" />
        </div>

        <form id="add_webhook">
          <br />

          <div className="webhook_form">
            <label htmlFor="webhook">Discord Webhook</label>
            <input
              type="url"
              className="form-control"
              id="webhook"
              placeholder="Enter Discord Webhook"
            />
          </div>
          <button type="save" className="btn btn-primary" id="saveweb">
            Save
          </button>
          <button type="test" className="btn btn-secondary" id="testweb">
            Test
          </button>
        </form>
        <br />
        <br />
        <br />
        <form>
          <div className="proxy_form">
            <label htmlFor="Proxy_list_name">Add New Proxy List</label>
            <input
              className="form-control"
              id="Proxy_list_name"
              placeholder="Proxy List 1"
            />
          </div>
          <div className="proxy_form">
            <label htmlFor="exampleFormControlTextarea1">
              Enter Proxies Here{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="ip:port:user:pass"
            />
          </div>
          <button type="save" className="btn btn-primary" id="saveweb">
            Save
          </button>
          <button type="test" className="btn btn-secondary" id="testweb">
            Test
          </button>
          <div className="proxy_form">
            <label htmlFor="exampleFormControlSelect1">Edit Proxy List</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </form>

        <form id="add_google">
          <div className="google_form">
            <label htmlFor="Proxy_list_name">Add Google Login</label>
            <input
              className="form-control"
              id="Proxy_list_name"
              placeholder="email:pass:proxy"
            />
          </div>
          <div className="google_form">
            <label htmlFor="exampleFormControlTextarea1">
              Enter Google Accounts Here{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="email:pass:proxy"
            />
          </div>
          <button type="save" className="btn btn-primary" id="saveweb">
            Save
          </button>
          <button type="test" className="btn btn-secondary" id="testweb">
            Test
          </button>
          <div className="google_form">
            <label htmlFor="exampleFormControlSelect1">
              Edit Google Account
            </label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </form>

        <form id="add_twocaptcha">
          <br />

          <div className="two_capcha_form">
            <label htmlFor="webhook">Two Captcha Token</label>
            <input
              className="form-control"
              id="twocap"
              placeholder="Enter Two Captcha Token"
            />
          </div>
          <button type="save" className="btn btn-primary" id="saveweb">
            Save
          </button>
          <button type="test" className="btn btn-secondary" id="testweb">
            Test
          </button>
        </form>

        <form id="add_anticaptcha">
          <br />

          <div className="anti_capcha_form">
            <label htmlFor="webhook">Anti Captcha Token</label>
            <input
              className="form-control"
              id="anticap"
              placeholder="Enter Anti Captcha Token"
            />
          </div>
          <button type="save" className="btn btn-primary" id="saveweb">
            Save
          </button>
          <button type="test" className="btn btn-secondary" id="testweb">
            Test
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SettingsWindow;
