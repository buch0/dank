const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366, height: 720,
    minWidth: 1194, minHeight: 720,
    webPreferences: {
        nodeIntegration: true,
    }
  })

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  //console.log(startUrl);
  mainWindow.loadURL('http://localhost:3000');

  /*
  mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
  );
  */
  mainWindow.webContents.openDevTools()

  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
  app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
  createWindow();
  }
});

global.util = require('./util');
global.request = require('request');
global.path = process.cwd();