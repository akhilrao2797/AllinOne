const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");

window.onload = () => {
    document.querySelector('div#buttons').style.display="none";
    document.querySelector('div#logo-icon-container').style.display="none";
}