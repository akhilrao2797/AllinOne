const { app, BrowserWindow, ipcMain } = require('electron');

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
let reply;
ipcMain.on('message',function(event,arg){
    console.log("This message is in MAIN")
    console.log(arg);
    reply = arg;
    //googleChatWindow.webContents.send('sentMessage',arg)
})
 ipcMain.on('sendmessage',function(event){
     event.returnValue = reply;
 })
