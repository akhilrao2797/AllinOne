const path = require('path');
const { remote } = require('electron')
const { BrowserWindow } = require('electron').remote


const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const webviewContainer = document.querySelector('#webview-container');
const webviewElement = document.querySelector('.webview');
const loading = document.querySelector('#loading');
const logoutButton = document.querySelector('#logout');

let chatWindow;
let gitlabWindow;

const intialWebViewLoad = () => {
    loading.style.display = 'block'
    webviewElement.style.display = "none";
}

webviewElement.addEventListener('did-finish-load', () => {
    loading.style.display = 'none'
    webviewElement.style.display = "inline-flex"
})
// DEVELOPEMENT
webviewElement.addEventListener('dom-ready', () => {
    webviewElement.openDevTools()
})

// Intial Gmail Load
intialWebViewLoad();
webviewElement.setAttribute('src', 'https://mail.google.com/mail/u/0/');
webviewElement.setAttribute('id', 'gmailWebView');
webviewElement.setAttribute('preload', path.join(__dirname, 'preloads', 'gmail', 'gmailCompose.js'));


// Loading animation

// Create Child Browser window
chatButton.addEventListener('click', (e) => {
    if (chatWindow == null) {
        chatWindow = new BrowserWindow({ resizable: false, maximizable: false, webPreferences: { preload: path.join(__dirname, 'preloads', 'googleChat', 'googleChat.js'), nodeIntegration: false } });
        chatWindow.loadURL('https://chat.google.com/u/0/');
    }
    if (chatWindow.isFocused()) {
        console.log("IS FOCUSED")
    }
    else {
        console.log("MAKING FOCUS")
        chatWindow.focus();
    }
    chatWindow.on('closed', () => {
        chatWindow = null;
    })
})
gitlabButton.addEventListener('click', (e) => {
    if (gitlabWindow == null) {
        gitlabWindow = new BrowserWindow({
            resizable: false,
            maximizable: false,
            webPreferences: { preload: path.join(__dirname, 'preloads', 'gitlab', 'allProjectsPreload.js') }, nodeIntegration: false
        });
        gitlabWindow.loadURL('https://git.hashedin.com');
    }
    if (!gitlabWindow.isFocused()) {
        gitlabWindow.focus();
    }
    gitlabWindow.on('closed', () => {
        gitlabWindow = null;
    })
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