const electron = require('electron')
const { ipcRenderer } = require('electron');
window.onload = () => {

    //document.querySelector("footer").style.display = 'none';
    const reply = ipcRenderer.sendSync("textFromMergeRequestToSlack")
    console.log("Reply is: ", reply)
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    function runcode() {
        console.log('inside function')
        document.querySelectorAll('div.ql-editor')[1].innerText = reply

    }
    window.setTimeout(runcode, 5000)

}