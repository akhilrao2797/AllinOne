const path = require('path');
const remote = require('electron').remote;

const gmailButton = document.querySelector('#gmail-button');
const chatButton = document.querySelector('#chat-button');
const googleButton = document.querySelector('#google-button');
const gitlabButton = document.querySelector('#gitlab-button');
const youtubeButton = document.querySelector('#youtube-button');
const webviewContainer = document.querySelector('#webview-container');
const webviewElement = document.querySelector('.webview');
const buttton  = document.querySelector('#BUTTON');

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
    webviewElement.setAttribute('preload',path.join(__dirname,'preloads','gitlab','allProjectsPreload.js'));
})

youtubeButton.addEventListener('click', (e) => {
    webviewElement.setAttribute('src','https://www.youtube.com/');
    webviewElement.setAttribute('id','youtubeWebView');
    webviewElement.setAttribute('preload',path.join(__dirname,'preloads','youtube','youtubePreload.js'));
})
buttton.addEventListener('click',()=>{
    var window = remote.getCurrentWindow();
    window.hide(); 
})
// Development
// webviewElement.addEventListener('dom-ready', () => {
//     webviewElement.openDevTools()
//     })
    