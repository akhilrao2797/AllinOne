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
            label: 'Share By Email',
            click: function (event) {
                //event.preventDefault();
                //console.log(href)
                console.log('ctx menu clicked')
                console.log("Url is ", href)
                let windowGmail = new BrowserWindow(
                    {
                        alwaysOnTop: true,
                        width: 800,
                        height: 800,
                    }
                )
               // win.on('close', function () { win = null })
                let url = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Google_Link&body=' + href
                windowGmail.loadURL(url)
            }
        }
    ))
    // ctxMenu.append(new MenuItem(
    //     {
    //         label: 'Share By Google Chat',
    //         click: function () {
    //             //console.log(href)
    //             console.log('Sharing By Google Chat')
    //             console.log("Url is ", href)
    //         }
    //     }
    // ))


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