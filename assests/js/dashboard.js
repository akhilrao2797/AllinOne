const path = require('path');
const { app, BrowserWindow } = require('electron');

const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const webviewContainer = document.querySelector('#webview-container');
const webviewElement = document.querySelector('.webview');
const loading = document.querySelector('#loading');

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


webviewElement.addEventListener('did-finish-load', () => {
    console.log(loading.style);
    loading.style.display='none'
    webviewElement.style.display = "inline-flex"
})


// // Development
// webviewElement.addEventListener('dom-ready', () => {
//     webviewElement.openDevTools()
// })
