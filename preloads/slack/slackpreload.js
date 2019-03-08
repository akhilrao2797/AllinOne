const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');
const {ipcRenderer} = require('electron');

window.onload = () => {
    console.log("Preload Working");
    if(document.querySelector('div.align_center')){
        document.querySelector('div.align_center').remove()
        document.querySelector('footer').remove()
    }
 
}