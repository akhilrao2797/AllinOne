const electron = require('electron')
const {ipcRenderer} = require('electron');
window.onload = () => {

    document.querySelector("footer").style.display = 'none';
    const reply = ipcRenderer.sendSync("textFromMergeRequestToSlack")
    console.log("Reply is")
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    function runcode(){
    document.querySelectorAll('div.ql-editor')[1].innerText= reply
   
    }
    window.setTimeout(runcode,5000)
    
   }