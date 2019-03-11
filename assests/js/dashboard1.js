const path = require('path');
const { remote ,ipcRenderer} = require('electron')
let stackurl;
let insideEle1;
let insideEle2;
// DOM elements
const webview1 = document.querySelector('#webview-1')
const webview2 = document.querySelector('#webview-2')
const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const gitlabButton = document.querySelector('#gitlab-button');
const loading = document.querySelector('#loading');
const logoutButton = document.querySelector('#logout');
const replButton = document.querySelector('#repl-button');
const slackButton = document.querySelector('#slack-button');

let gmailView = webviewCreator('https://mail.google.com/mail/u/0/', 'gmailWebView', path.join(__dirname, 'preloads', 'gmail', 'gmailCompose'));
let gitView = webviewCreator('https://git.hashedin.com', 'gitlabWebView', path.join(__dirname, 'preloads', 'gitlab', 'allProjectsPreload'));
let chatView = webviewCreator('https://chat.google.com/u/0/', 'chatWebView', path.join(__dirname, 'preloads', 'googleChat', 'googleChat.js'));
let slackView = webviewCreator('https://slack.com/signin','replWebView',path.join(__dirname,'preloads','slack','slackpreload.js'))
let replView = webviewCreator('https://repl.it/repls','replWebView',path.join(__dirname,'preloads','repl','repl.js'))

function webviewCreator(url, id, preload) {
    console.log(url)
    ele = document.createElement('webview');
    ele.src = url;
    ele.id = id;
    ele.style = "top:0; display:inline-flex !important; width: 100%; height: 99.5%;";
    if(preload!=null){
        ele.setAttribute('preload', preload);
    }
    ele.setAttribute('allowpopups', '')
    ele.addEventListener('did-finish-load', () => {
        loading.style.display='none'
        ele.style.display = "inline-flex"
    })
    ele.addEventListener('dom-ready', () => {
        console.log(ele.src)
        ele.openDevTools()
    })
    
    return ele
}

replView.setAttribute('webPreferences',`{
    nativeWindowOpen:false
}`)

// Drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}
function dragEnter1(ev) {
    insideEle1 = ev.target.innerHTML;
    ev.target.innerHTML = '<h6 class="display-4 text-center text-secondary"><i>Drop Here</i></h6>'
}
function dragExit1(ev) {
    ev.target.innerHTML = insideEle1
}
function dragEnter2(ev) {
    insideEle2 = ev.target.innerHTML;
    ev.target.innerHTML = '<h6 class="display-4 text-center text-secondary"><i>Drop Here</i></h6>'
}
function dragExit2(ev) {
    ev.target.innerHTML = insideEle2
}

function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    loading.style.display='block'
    var data = ev.dataTransfer.getData("text/plain");
    if (document.getElementById(data).id === 'gmail-button') {
        ev.target.innerHTML = ''
        ev.target.appendChild(gmailView)
    }
    else if (document.getElementById(data).id === 'chat-button') {
        ev.target.innerHTML = ''
        ev.target.appendChild(chatView)
    }
    else if (document.getElementById(data).id === 'gitlab-button') {
        ev.target.innerHTML = ''
        ev.target.appendChild(gitView)
    }
    else if (document.getElementById(data).id === 'slack-button') {
        ev.target.innerHTML = ''
        ev.target.appendChild(slackView)
    }
}

gmailButton.addEventListener('click', () => {
    webview1.innerHTML = ''
    webview1.appendChild(gmailView)
})
chatButton.addEventListener('click', () => {
    webview2.innerHTML = ''
    webview2.appendChild(chatView)
})
gitlabButton.addEventListener('click', () => {
    webview1.innerHTML = ''
    webview1.appendChild(gitView)
})

logoutButton.addEventListener('click', () => {
    remote.getCurrentWindow().hide();
    fetch('https://www.google.com/accounts/Logout')
        .then(() => {
            fetch('https://git.hashedin.com/users/sign_out')
                .then(() => {
                    fetch('https://repl.it/logout')
                        .then(()=>{
                            remote.getCurrentWindow().hide();
                        })
                    
                })
        })
})
slackButton.addEventListener('click',()=>{
    webview2.innerHTML = ''
    webview2.appendChild(slackView)
})
replButton.addEventListener('click',()=>{
    webview1.innerHTML = ''
    webview1.appendChild(replView)
})

ipcRenderer.on('stackoverflow-open',(event,args)=>{
    stackurl = args;
    let stackoverflowView = webviewCreator(stackurl,'stackView',null)
    console.log("in dashboard:",args)
    webview2.innerHTML=''
    webview2.appendChild(stackoverflowView)
})

// replView.addEventListener('dom-ready',()=>{
//     replView.openDevTools();
// })