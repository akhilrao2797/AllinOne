const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const ipc = electron.ipcRenderer;

window.onload = () => {
    mainUrl=ipc.sendSync('urlRecieve');
    console.log(mainUrl);
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none"; 
}