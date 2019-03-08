const electron = require('electron');
const BrowserWindow= electron.remote.BrowserWindow;
const path = require("path");
const { ipcRenderer } = require('electron');

window.onload = () => {
    document.querySelector('ul.list-unstyled.navbar-sub-nav').style.display="none";
    document.querySelector('ul.nav.navbar-nav').style.display="none";
    if(document.querySelector('a.btn.btn-success')){
    let editAndNewMergeRequestButton = document.querySelector('a.btn.btn-success');
    console.log(editAndNewMergeRequestButton);
    
    editAndNewMergeRequestButton.addEventListener("click",(e)=>{
        e.preventDefault();
        let href = editAndNewMergeRequestButton.href;
        let mergeRequestWindow = new BrowserWindow({
            webPreferences:{
                preload:path.join(__dirname,'newMergeRequestPreload.js')
            }
        });
        mergeRequestWindow.loadURL(href);
        })
    }
    let ssh = document.querySelector('input#ssh_project_clone');
    
    if(document.querySelector('div.project-repo-buttons.col-md-12.col-lg-6.d-inline-flex.flex-wrap.justify-content-lg-end')){
        var gmailShareButton = document.createElement("button")
        gmailShareButton.className="project-clone-holder d-none d-md-inline-flex"
        gmailShareButton.appendChild(document.createTextNode('Share SSH By Gmail'));
        document.querySelector('div.project-repo-buttons.col-md-12.col-lg-6.d-inline-flex.flex-wrap.justify-content-lg-end').appendChild(gmailShareButton);
        gmailShareButton.style.height="40%";
        gmailShareButton.className="shareSSHButton d-inline-flex js-notification-dropdown notification-dropdown project-action-button dropdown inline";
    
        document.querySelector('button.shareSSHButton').addEventListener("click",(e)=>{
            let gmailWindow = new BrowserWindow({ width: 800, height: 600 });
            gmailWindow.loadURL('https://mail.google.com/mail/?view=cm&fs=1&su=SSH for the project '+
            document.querySelector('h1.project-title.qa-project-name').innerText+'&body='+
            document.querySelector('h1.project-title.qa-project-name').innerText+ ' ssh is below %0A'
            + ssh.value);
        })

        var chatShareButton = document.createElement("button")
        chatShareButton.className="project-clone-holder d-none d-md-inline-flex"
        chatShareButton.appendChild(document.createTextNode('Share SSH By Chat'));
        document.querySelector('div.project-repo-buttons.col-md-12.col-lg-6.d-inline-flex.flex-wrap.justify-content-lg-end').appendChild(chatShareButton);
        chatShareButton.style.height="40%";
        chatShareButton.className="chatShareSSHButton d-inline-flex js-notification-dropdown notification-dropdown project-action-button dropdown inline";
        
        let chatWindow;
        document.querySelector('button.chatShareSSHButton').addEventListener("click",(e)=>{
            chatWindow = new BrowserWindow({ width: 800, height: 600 });
            chatWindow.loadURL("https://chat.google.com/add/dm");
            chatWindow.webContents.on('did-navigate-in-page',()=>{
                console.log('aa')
                chatWindow.webContents.executeJavaScript(`
                    initialURL="https://chat.google.com/add/dm";
                    currentURL=document.URL;
                    console.log(currentURL)
                    if(currentURL !== initialURL)
                    {
                        const {ipcRenderer} = require('electron');
                        const reply = ipcRenderer.sendSync("sshValue")
                        function executeCode(){
                            console.log(reply)
                            document.querySelector('div.Ct5IYc.qs41qe').innerText=""
                            document.querySelector('div.oAzRtb.krjOGe').innerText=reply; 
                            document.querySelector('div.XT3Vq').click();      
                           
                        }
                        setTimeout(executeCode,5000);
        
                    }     
                    else
                    {
                        console.log(" ")
        
                    }         
                `)
            })
        })
        
    }
    
    ipcRenderer.send('urlSend',document.URL);
    ipcRenderer.send('sshSend',ssh.value);
}
