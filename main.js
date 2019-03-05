const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
      webPreferences:{
          webviewTag:true
      }
  })

  // and load the index.html of the app.
  win.loadFile('dashboard.html')
}

app.on('ready', createWindow)