const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const path = require('path');
const menu = new Menu()

let win
let loginChild

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    webPreferences: {
      webviewTag: true,
      nativeWindowOpen: true,
    }
  })

  loginChild = new BrowserWindow(
    {
      parent: win, width: 575, height: 530, frame: false, resizable: false, webPreferences: {
        webviewTag: true,
        nodeIntegration: false,
        preload: path.join(__dirname, 'preloads', 'login.js'),
      }
    })
  loginChild.loadURL('https://accounts.google.com/signin')
  gmailBackgroundWindow = new BrowserWindow(
    {
      parent: win, width: 0, height: 0, frame: false, resizable: false, webPreferences: {
        nodeIntegration: false,
        preload: path.join(__dirname, 'preloads', 'login.js'),
      }
    })
  loginChild.loadURL('https://accounts.google.com/signin')

  loginChild.on('page-title-updated', () => {
    if (loginChild.webContents.getURL().includes('https://myaccount.google.com')) {
      loginChild.hide();
      win.loadFile('dashboard.html');
      win.maximize();
      win.show();
    }
  })
  win.on('hide', () => {
    loginChild.loadURL('https://accounts.google.com/signin');
    loginChild.show();
  })
  win.on('closed', () => {
    win = null;
    loginChild = null;
    app.exit();
  })
  loginChild.on('closed', () => {
    win = null;
    loginChild = null;
    app.exit();
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

