const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');
const ipc = require('electron').ipcRenderer;
const Menu = electron.remote.Menu;
const MenuItem = electron.remote.MenuItem;

    

function createContextMenu(win, href) {
    console.log("Function for context menu")
    const ctxMenu = new Menu()
    ctxMenu.append(new MenuItem(
        {
            label: 'Share',
            click: function () {
                //console.log(href)
                console.log('ctx menu clicked')
                console.log("Url is ", href)
                    
//             let windowGoogleChat = new BrowserWindow({ alwaysOnTop: true, width: 800, height: 600 });
//             windowGoogleChat.webContents.on('did-finish-load', () => {
//                 windowGoogleChat.webContents.send('message', 'This is a message from the renderer process to the second window.')
//             });
//             windowGoogleChat.webContents.openDevTools();
//             windowGoogleChat.on('close', () => {
//                 win = null;
//             });
//             windowGoogleChat.loadURL(path.join('file://', process.cwd(), 'GoogleChat.html'));
//             windowGoogleChat.show();
        
        }
    }
    ))
        win.webContents.on('context-menu', function (e, params) {
        ctxMenu.popup(win, params.x, params.y)
    })

}

window.onload = () => {
    let sc = document.createElement('script');
    sc.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    document.querySelector('body').appendChild(sc)

    d = document.querySelectorAll('div.rc');
    for (let div of d) {
        div.addEventListener('click', (e) => {
            let href = div.querySelector('a').href;
            e.preventDefault();
            e.stopPropagation();
            let win = new BrowserWindow(
                {
                    alwaysOnTop: true,
                    width: 500,
                    height: 600,
                }
            )
            win.on('close', function () { win = null })
            win.loadURL(href)
            //console.log("url here is ",document.URL)
            createContextMenu(win, href);
        })
    }


}