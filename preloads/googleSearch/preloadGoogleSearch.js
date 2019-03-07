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
                let windowGmail = new BrowserWindow(
                    {
                        alwaysOnTop: true,
                        width:  800,
                        height: 600,
                        frame: false
                    }
                )
                windowGmail.on('close', function () { windowGmail = null })
                let url = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Google_Link&body=' + href
                windowGmail.loadURL(url)
                windowGmail.webContents.on('ready-to-show',()=>{
                    windowGmail.webContents.openDevTools();
                    console.log("readytoshow is working")
                })
                windowGmail.webContents.executeJavaScript(`
                function dragWindow(){
                    document.querySelector('div.Io').style.webkitAppRegion = "drag";       
                }
                setTimeout(dragWindow,2000);
                `)
            }
        }
    ))
    ctxMenu.append(new MenuItem(
        {
            label: 'Share By Google Chat',
            click: function () {
                let windowGoogleChat = new BrowserWindow(
                    { 
                        alwaysOnTop: true, width: 800, height: 600,
                    }
                    );
                ipcRenderer.send('message',href)
                windowGoogleChat.loadURL("https://chat.google.com/add/dm");
                windowGoogleChat.on('close', () => {
                    win = null;
                });
                windowGoogleChat.show();
             
                windowGoogleChat.webContents.on('did-navigate-in-page',()=>{
                    windowGoogleChat.webContents.executeJavaScript(`
                        initialURL="https://chat.google.com/add/dm";
                        currentURL=document.URL;
                        if(currentURL !== initialURL)
                        {    
                            const {ipcRenderer} = require('electron');
                            const reply = ipcRenderer.sendSync("sendmessage")
                            function executeCode(){
                                document.querySelector('div.oAzRtb.krjOGe').innerText=reply; 
                                document.querySelector('div.oAzRtb.krjOGe').click();        
                            }
                            setTimeout(executeCode,5000);

                        }     
                        else
                        {
                            console.log(" ")

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
    document.querySelector('div.gb_Ef').style.display='none';
    d = document.querySelectorAll('div.rc');
    for (let div of d) {
        div.addEventListener('click', (e) => {
            let href = div.querySelector('a').href;
            e.preventDefault();
            e.stopPropagation();
            let win = new BrowserWindow(
                {
                    alwaysOnTop: true,
                    width:  800,
                    height: 600,
                }
            )
            win.on('close', function () { win = null })
            win.loadURL(href)
            createContextMenu(win, href);
        })
    }


}