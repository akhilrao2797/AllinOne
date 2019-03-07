const { app, BrowserWindow , ipcMain, Tray, Menu} = require('electron');
const Store = require('./store.js');
const path = require('path');
let win
let loginChild

const iconPath = '/home/vatsala_mittal/all_in_one/Logo.png';
let tray = null

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 1366, height: 713 }
  }
});

function createTray(){
  console.log("create tray function accessed")
  tray = new Tray(iconPath)
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
                preload: path.join(__dirname,'gmailCompose.js')
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
    }, {
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
  console.log("Create Window is accessed")
  createTray();
 
  let { width, height } = store.get('windowBounds');

  // Create the browser window.
  win = new BrowserWindow({
    webPreferences: {
      webviewTag: true,
      nativeWindowOpen: true
    },
    width, height,
    show: false
  })
  // and load the dashboard.html of the app.
  win.loadFile('dashboard.html');

  win.on('resize', () => {
 
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = win.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  });

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
let reply;
ipcMain.on('message',function(event,arg){
    reply = arg;
})
 ipcMain.on('sendmessage',function(event){
     event.returnValue = reply;
 })
