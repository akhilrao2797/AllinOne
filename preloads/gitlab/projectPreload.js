const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const { ipcMain } = require('electron');

window.onload = () => {
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none";
    let editAndNewMergeRequestButton = document.querySelector('a.btn.btn-success');
    editAndNewMergeRequestButton.addEventListener("click",(e)=>{
        e.preventDefault();
        let href = editAndNewMergeRequestButton.href;
        let mergeRequestWindow = new BrowserWindow({
            webPreferences:{
                preload:path.join(__dirname,'newMergeRequestPreload.js')
            }
        });
        mergeRequestWindow.loadURL(href);
        
        // ipc.on('url',function(e){
        //     e.sender.send('urlsent',document.URL);
        // })
    })

}
