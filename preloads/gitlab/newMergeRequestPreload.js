const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const ipc = electron.ipcRenderer;

window.onload = () => {
    mainUrl=ipc.sendSync('urlRecieve');
    console.log(mainUrl);
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none";
    document.querySelector('div.nav-sidebar').style.width="0%";
    document.querySelector('a.toggle-sidebar-button.js-toggle-sidebar').style.display="none";
    document.querySelector('div.nav-sidebar.sidebar-collapsed-desktop').style.display="none";
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none";




    let mergeRequestSent=document.querySelector('input.btn.btn-success.qa-issuable-create-button');
    // console.log(mainUrl);
    mergeRequestSent.addEventListener("click",()=>{
        let gmailWindow = new BrowserWindow({ width: 800, height: 600 });
        gmailWindow.loadURL('https://mail.google.com/mail/?view=cm&fs=1&su=Please review my merge request'+
        '&body='+
        document.querySelector('textarea.note-textarea.qa-issuable-form-description.js-gfm-input.js-autosize.markdown-area').value+
        '%0APlease review my merge request%0A'+ mainUrl);

        let slackWindow = new BrowserWindow({
            width:800,
            height:600,
            webPreferences:{
                nodeIntegration:false,
                preload: path.join(__dirname,'preloads','slack','slackpreload.js')
            }
        });
        slackWindow.loadURL('https://slack.com/signin');
    })
    
}