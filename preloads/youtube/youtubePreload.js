const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");

window.onload = () => {
    document.querySelector('div#buttons').style.display="none";
    document.querySelector('div#logo-icon-container').style.display="none";
    var hideButton = document.createElement('button')
    hideButton.appendChild(document.createTextNode('Hide'));
    document.querySelector('div#container').appendChild(hideButton);
    hideButton.className="hideButton";
    
    document.querySelector('button.hideButton').addEventListener("click",()=>{
        document.hide();
    })
}