const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
const Store = require('./store.js');
const path = require('path');
const menu = new Menu()


let win
let loginChild

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 1366, height: 713 }
  }
});

function createWindow() {
  let { width, height } = store.get('windowBounds');

  // Create the browser window.
  win = new BrowserWindow({
    webPreferences: {
      webviewTag: true,
      nativeWindowOpen: true,
      preload: path.join(__dirname, 'preloads', 'dashboard', 'dashboardPreload.js')
    },
    width, height,
    show: false
  })
  // and load the dashboard.html of the app.
  win.loadFile('dashboard.html');

//   win.webContents.on('context-menu', (e) => {
//     e.preventDefault()
//     menu.popup()
// }, false)

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

   
