const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;

window.onload = () => {
    if(document.querySelector('a#oauth-login-google_oauth2') !== null){
        document.querySelector('a#oauth-login-google_oauth2').click();
    }
    let projects = document.querySelectorAll('li.d-flex.no-description.project-row');
    mainUrl=document.URL;
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none";
    if(document.querySelector('a.btn.btn-success'))
    {
        let editAndNewMergeRequest = document.querySelector('a.btn.btn-success');
        editAndNewMergeRequest.addEventListener("click",(e)=>{
            e.preventDefault();
            console.log(editAndNewMergeRequest);
            let href = editAndNewMergeRequest.href;
            let win = new BrowserWindow({
                webPreferences:{
                    preload:path.join(__dirname,'newMergeRequestPreload.js')
                }
            });
            win.loadURL(href);
        })
    }

    for(let project of projects)
    {
        project.addEventListener("click",(e)=>{
            e.preventDefault();
            let href =project.querySelector('a').href;
            console.log(href);
            let win = new BrowserWindow({
                width:1000,
                height:800,
                webPreferences:{
                    preload:path.join(__dirname, 'projectPreload.js')
                }
            });
            win.loadURL(href);
        })
    }
    
 };