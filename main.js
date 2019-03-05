const { app, BrowserWindow } = require('electron');

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