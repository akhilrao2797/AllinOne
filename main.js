const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const Store = require('./store.js');
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
// creating context menus
menu.append(new MenuItem({
  label:'open in new window',
  click(){
    console.log("opening in a new window soon")
  }
}))

menu.append(new MenuItem({role:'copy'}))
menu.append(new MenuItem({role:'paste'}))

app.on('browser-window-created',(event,win)=>{
  win.webContents.on('context-menu',(e,params)=>{
    menu.popup(win,params.x,params.y)
  })
})

ipcMain.on('show-context-menu',(event, newMenuItem)=>{
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})

   
