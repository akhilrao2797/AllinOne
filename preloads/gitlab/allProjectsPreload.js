const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
const {remote} = electron
const {Menu, MenuItem} = remote
const gitlabmenu = new Menu()

let selectedText


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
    
    // creating context menus
    gitlabmenu.append(new MenuItem({ label: 'menu for gitlab window', click() { console.log('new tab will open in near future') } }))
    gitlabmenu.append(new MenuItem({ type: 'separator' }))
    gitlabmenu.append(new MenuItem({ label: 'item clicked', type: 'checkbox', checked: true }))
    gitlabmenu.append(new MenuItem({role:'copy'}))
    gitlabmenu.append(new MenuItem({role:'paste'}))
    gitlabmenu.append(new MenuItem({
        label: 'open compose box in gmail',
        click() {
            selectedText = document.getSelection().toString();
            popUpCompose(selectedText)
        }
    }));

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        gitlabmenu.popup()
        // ipcRenderer.send('show-context-menu',gitlabmenu)
    })
 };

 function popUpCompose(selectedText) {
    regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    var found;
    var indexArray=[];
    var bodyText,strindex;
    var emailsArray = selectedText.match(regex);
    if (emailsArray!=null){

        if(emailsArray!=null && emailsArray.length){
            while((found=regex.exec(selectedText)) !==null){
            indexArray.push(found.index)
            }
                strindex=indexArray[emailsArray.length-1]+emailsArray[emailsArray.length-1].length
                // emails are in front and body comes after
                if(strindex != selectedText.length){
                    bodyText = selectedText.slice(strindex)
                }
                // body comes front so put everything in bodytext
                else{
                    bodyText = selectedText
                }
                
            }
        }
    
        else 
        {
            console.log('in else')
            // put the selected text in the body
            bodyText = selectedText;
            emailsArray="";
        }

    let gmailComposeWin = new BrowserWindow({
        width: 500,
        height: 600
    })
    let url = "https://mail.google.com/mail/?view=cm&to=" + emailsArray + "&fs=1&body=" + bodyText
    gmailComposeWin.loadURL(url)
    gmailComposeWin.show()
    gmailComposeWin.on('close', () => {
        gmailComposeWin = null
    })
}
