const path = require('path');
let insideEle1;
let insideEle2;
// DOM elements
const webview1 = document.querySelector('#webview-1')
const webview2 = document.querySelector('#webview-2')
const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const loading = document.querySelector('#loading');
const logoutButton = document.querySelector('#logout');
const replButton = document.querySelector('#repl-button');

let gmailView = webviewCreator('https://mail.google.com/mail/u/0/', 'gmailWebView', path.join(__dirname, 'preloads', 'gmail', 'gmailCompose'));
let gitView = webviewCreator('https://git.hashedin.com', 'gitlabWebView', path.join(__dirname, 'preloads', 'gitlab', 'allProjectsPreload'));
let chatView = webviewCreator('https://chat.google.com/u/0/', 'chatWebView', path.join(__dirname, 'preloads', 'googleChat', 'googleChat.js'));
let replView = webviewCreator('https://repl.it/','replWebView',path.join(__dirname,'preloads','repl','repl.js'))

function webviewCreator(url, id, preload) {
    ele = document.createElement('webview');
    ele.src = url;
    ele.id = id;
    ele.style = "top:0; display:inline-flex !important; width: 100%; height: 99.5%;";
    ele.setAttribute('preload', preload);
    ele.setAttribute('allowpopups', '')
    ele.addEventListener('did-finish-load', () => {
        loading.style.display='none'
        ele.style.display = "inline-flex"
    })
    ele.addEventListener('dom-ready', () => {
        ele.openDevTools()
    })
    
    return ele
}

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
                    remote.getCurrentWindow().hide();
                })
        })
})
replButton.addEventListener('click',()=>{
    webview1.innerHTML = ''
    webview1.appendChild(replView)
})