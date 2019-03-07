const { app, BrowserWindow } = require('electron');
const {ipcMain} = require('electron');

let win
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
      webPreferences:{
          webviewTag:true
      }
  })
  win.maximize();
  // and load the index.html of the app.
  win.loadFile('dashboard.html');
  win.on('closed', () => {
    win = null
  })
}


app.on('ready', createWindow)
let mainUrl;
ipcMain.on('urlSend',function(event,arg){
  mainUrl=arg;
})
ipcMain.on('urlRecieve',function(event){
  event.returnValue=mainUrl;
})
let sshValue;
ipcMain.on('sshSend',function(event,arg){
  sshValue=arg;
})
ipcMain.on('sshValue',function(event){
  event.returnValue=sshValue;
})
