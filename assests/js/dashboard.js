const path = require('path');

const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const webviewContainer = document.querySelector('#webview-container');
const webviewElement = document.querySelector('.webview');
console.log(webviewElement)

gmailButton.addEventListener('click', (e) => {
    webviewElement.setAttribute('src','https://mail.google.com/mail/u/0/');
    webviewElement.setAttribute('id','gmailWebView');
    webviewElement.setAttribute('preload',path.join(__dirname,'preloads','gmail','gmailCompose.js'));
})

chatButton.addEventListener('click', (e) => {
    webviewElement.setAttribute('src','https://chat.google.com/u/0/');
    webviewElement.setAttribute('id','chatWebView');
})

googleButton.addEventListener('click', (e) => {
    webviewElement.setAttribute('src','https://www.google.com');
    webviewElement.setAttribute('id','googleWebView');
})

gitlabButton.addEventListener('click', (e) => {
    webviewElement.setAttribute('src','https://git.hashedin.com');
    webviewElement.setAttribute('id','gitlabWebView');
})


// Development
webviewElement.addEventListener('dom-ready', () => {
    webviewElement.openDevTools()
    })
    