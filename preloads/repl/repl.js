const electron = require('electron')
const {remote, ipcRenderer} = electron
const {Menu, MenuItem} = remote
const BrowserWindow = electron.remote.BrowserWindow
const menu = new Menu()

// const menu = new Menu()
// let selectedText;

window.onload = ()=>{
    if(document.querySelector('a.jsx-718046460.social-login-item')!=null){
        document.querySelector('a.jsx-718046460.social-login-item').click();
    }
    console.log("in repl preload")
    menu.append(new MenuItem({
        label: 'search in stackoverflow',
        click() {
            selectedText = document.getSelection().toString();
            // selectedText="error in creating window electron"
            url = "https://stackoverflow.com/search?q="+selectedText
            ipcRenderer.send("stackoverflow",url)
            // popUpStackOverflow(selectedText)
        }
    }));

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menu.popup()
        // ipcRenderer.send('show-context-menu',gitlabmenu)
    })



}

function popUpStackOverflow(selectedText){
    stackOverflowWin= new BrowserWindow({
      width:500,
      height:500,
    })
    url = "https://stackoverflow.com/search?q="+selectedText
    stackOverflowWin.loadURL(url)
    stackOverflowWin.show()
    stackOverflowWin.on("close",function(){
      stackOverflowWin = null
    })
  }