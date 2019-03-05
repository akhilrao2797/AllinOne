const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
let composeWindow;

const composeWindowFunction = () => {
    document.querySelector('div.z0').innerHTML = "<button class='all-in-one-btn T-I J-J5-Ji T-I-KE L3'>Compose</button>"
    document.querySelector('button.all-in-one-btn').addEventListener('click', () => {
        composeWindow = new BrowserWindow({
            width: 500, height: 600,modal:true, webPreferences: {
                nodeIntegration: false
            }
        })
        composeWindow.loadURL('https://mail.google.com/mail/?view=cm&fs=1')
        composeWindow.show();
    })
}

window.onload = () => {
    composeWindowFunction();
}


