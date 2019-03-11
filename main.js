const { app, BrowserWindow, Menu, MenuItem, Tray , ipcMain} = require('electron');
const path = require('path');
const menu = new Menu()

let win
let loginChild
let tray = null
const iconPath = path.join(__dirname,'assests','images','Group123x.png')

// const store = new Store({
//   // We'll call our data file 'user-preferences'
//   configName: 'user-preferences',
//   defaults: {
//     windowBounds: { width: 1366, height: 713 }
//   }
// });

function createTray(){
  tray = new Tray(iconPath)
  tray.setHighlightMode('always')
  console.log(iconPath)

  let template = [
    {
      label: 'Compose Mail',
      click: function(){
        let windowGmail = new BrowserWindow(
          {
              alwaysOnTop: true,
              width:  800,
              height: 600,
              webPreferences:{
                preload: path.join(__dirname,'preloads','gmail','gmailCompose.js')
              } 
          }
      )
      windowGmail.loadURL('https://mail.google.com/mail/u/0/?view=cm&fs=1&tsu&body&bcc&tf=1')
      windowGmail.show();

      windowGmail.on('close', function () { windowGmail = null })

      }
    },
    {
      label: 'Open Chat',
      click: function(){
        let windowChat = new BrowserWindow(
          {
              //alwaysOnTop: true,
              width:  800,
              height: 600,
              webPreferences:{
                preload: path.join(__dirname,'preloads','googleChat','googleChat.js')
              } 
          }
      )
      windowChat.loadURL('https://chat.google.com/u/0/')
      windowChat.show();

      windowChat.on('close', function () { windowChat = null })

      }
    }, 
    
    {
      label: 'Open GitLab',
      click: function(){
        let gitlabChat = new BrowserWindow(
          {
              //alwaysOnTop: true,
              width:  800,
              height: 600,
              webPreferences:{
                preload: path.join(__dirname,'preloads','gitlab','allProjectsPreload.js')
              } 
          }
      )
      gitlabChat.loadURL('https://git.hashedin.com')
      gitlabChat.show();

      gitlabChat.on('close', function () { gitlabChat = null })

      }
    },
    {
      label: 'Open slack',
      click: function(){
        let slackWindow = new BrowserWindow(
          {
              //alwaysOnTop: true,
              width:  800,
              height: 600,
              webPreferences:{
                preload: path.join(__dirname,'preloads','slack','slackpreload.js')
              } 
          }
      )
      slackWindow.loadURL('https://slack.com/signin')
      slackWindow.show();

      slackWindow.on('close', function () { slackWindow = null })

      }
    },

    {
      label: 'Exit App',
      click:function(){
        app.exit();
      }
    }
  ]

  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Tray App')
}
function createWindow() {
  createTray();
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    minHeight:550,
    minWidth:1100,
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
      win.loadFile('dashboard1.html');
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
