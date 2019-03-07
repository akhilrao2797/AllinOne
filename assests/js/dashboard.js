const path = require('path');
const { app, BrowserWindow, net } = require('electron');
const remote = require('electron').remote;

const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const webviewContainer = document.querySelector('#webview-container');
const webviewElement = document.querySelector('.webview');
const loading = document.querySelector('#loading');
const logoutButton = document.querySelector('#logout');

// Loading animation
const intialWebViewLoad = () => {
    loading.style.display='block'
    webviewElement.style.display = "none";
}

gmailButton.addEventListener('click', (e) => {
    intialWebViewLoad();
    webviewElement.setAttribute('src', 'https://mail.google.com/mail/u/0/');
    webviewElement.setAttribute('id', 'gmailWebView');
    webviewElement.setAttribute('preload', path.join(__dirname, 'preloads', 'gmail', 'gmailCompose.js'));
})

chatButton.addEventListener('click', (e) => {
    intialWebViewLoad();
    webviewElement.setAttribute('src', 'https://chat.google.com/u/0/');
    webviewElement.setAttribute('id', 'chatWebView');
    webviewElement.setAttribute('preload', path.join(__dirname, 'preloads', 'googleChat', 'googleChat.js'));
    webviewElement.addEventListener("dom-ready", function(){ webviewElement.openDevTools();})
})

googleButton.addEventListener('click', (e) => {
    intialWebViewLoad();
    webviewElement.setAttribute('src', 'https://www.google.com');
    webviewElement.setAttribute('id', 'googleWebView');
})

gitlabButton.addEventListener('click', (e) => {
    intialWebViewLoad();
    webviewElement.setAttribute('src', 'https://git.hashedin.com');
    webviewElement.setAttribute('id', 'gitlabWebView');
})

logoutButton.addEventListener('click', ()=>{
    intialWebViewLoad();
    fetch('https://www.google.com/accounts/Logout')
    .then(()=>{
        fetch('https://git.hashedin.com/users/sign_out')
        .then(()=>{
            remote.getCurrentWindow().hide();
        })
    })
})

webviewElement.addEventListener('did-finish-load', () => {
    loading.style.display='none'
    webviewElement.style.display = "inline-flex"
})


// Development
webviewElement.addEventListener('dom-ready', () => {
    webviewElement.openDevTools()
})


// window.onload = ()=>{
//     console.log("hello form dash.js");
    
        
// }