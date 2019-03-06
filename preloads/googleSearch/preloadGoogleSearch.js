const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');
const {ipcRenderer} = require('electron');

const Menu = electron.remote.Menu;
const MenuItem = electron.remote.MenuItem;
const {ipcMain} = electron;


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
    ctxMenu.append(new MenuItem(
        {
            label: 'Share By Google Chat',
            click: function () {
                //console.log(href)
                console.log('ctx menu clicked')
                console.log("Url is ", href)

                let windowGoogleChat = new BrowserWindow(
                    { 
                        alwaysOnTop: true, width: 800, height: 600,
                        // webPreferences: {
                        //     preload:path.join(__dirname,'preloadGoogleChat.js')
                        // }
                    }
                    );
                ipcRenderer.send('message',href)
                windowGoogleChat.loadURL("https://chat.google.com/add/dm");
                windowGoogleChat.webContents.openDevTools();
                windowGoogleChat.on('close', () => {
                    win = null;
                });
                windowGoogleChat.show();
             
                console.log("CONSOLE GOES");
                windowGoogleChat.webContents.on('did-navigate-in-page',()=>{
                    console.log("NAVIGATED");
                    windowGoogleChat.webContents.executeJavaScript(`
                    console.log("1")
                    initialURL="https://chat.google.com/add/dm";
                    currentURL=document.URL;
                    console.log("2")
                    console.log("current url is", currentURL)
                    if(currentURL !== initialURL)
                    {    const {ipcRenderer} = require('electron');
                        const reply = ipcRenderer.sendSync("sendmessage")
                        console.log("3")
                        console.log("set time out")
                        function executeCode(){
                            console.log("url changed to ",currentURL)
                            document.querySelector('div.oAzRtb.krjOGe').innerText=reply; 
                            document.querySelector('div.oAzRtb.krjOGe').click();        
                        }
                        setTimeout(executeCode,5000);

                    }     
                    else
                    {
                        console.log("4")
                        console.log("On same page")

                    }         
                    `)
                })


            }
        }
    ))

    win.webContents.on('context-menu', function (e, params) {
        ctxMenu.popup(win, params.x, params.y)
    })

}

window.onload = () => {

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
            //win.on('close', function () { win = null })
            win.loadURL(href)
            //console.log("url here is ",document.URL)
            createContextMenu(win, href);
        })
    }


}