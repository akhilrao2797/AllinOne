const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");

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
        let newProjectBtn = document.querySelector('a.btn.btn-success');
        newProjectBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            let href = newProjectBtn.href;
            let newProjectWindow = new BrowserWindow({ 
                webPreferences:{
                    preload:path.join(__dirname,'newMergeRequestPreload.js')
                }
            });
            newProjectWindow.loadURL(href);
        })
    }

    for(let project of projects)
    {
        project.addEventListener("click",(e)=>{
            e.preventDefault();
            let href =project.querySelector('a').href;
            console.log(href);
            let projectWindow = new BrowserWindow({
                width:800,
                resizable: false,
                webPreferences:{
                    preload:path.join(__dirname, 'projectPreload.js')
                }
            });
            projectWindow.loadURL(href);
            projectWindow.on("close",()=>{
                ProjectWindow=null;
            })
        })
    }
    
 };