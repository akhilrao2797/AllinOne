const electron = require('electron')
// const { globalShortcut } = require('electron')

const path = require('path')
// const ipc = electron.ipcRenderer
// const remote = electron.remote
const MainWindow = electron.remote
const BrowserWindow = electron.remote.BrowserWindow
let win
let tempWindow

function CreateNewWindow(url){
    
    let win = new BrowserWindow(
        {   
            frame:false,
            alwaysOnTop:false,
            width:500,
            height:600,
            maxHeight:700,
            maxWidth:600,
            webPreferences: {
                preload: path.join(__dirname,'chatPreload.js')
            }
        },
        
    )
    // win.on('blur',()=>{
    //     win.close()
    // })
    // const currentWindow = electron.remote.getCurrentWindow()
    // currentWindow.addEventListener('dom-ready',()=>{
    //     currentWindow.webContents.openDevTools();
    // })
    
    win.on('close', function(){win=null})
    win.loadURL(url)
    win.show(
        // console.log("new window")
        // console.log(document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0])
        )
    // win.on('show',()=>{
    //     console.log("onshowing the new window");
    // document.querySelector("div.X9KLPc").style.width="100%"
    // document.querySelector("div.DLc2vb").style.display="none"
    // document.querySelector("div .Riuhhf").style.width = "-webkit-fill-available"
    // document.querySelector("div .Jrbdv.tRImzd").style.display = "none"
    // })
}

window.onload= () =>{
    initialURL = document.URL
    // console.log("preload working")
    // // document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0].style.display = "none"
    document.querySelector("div.X9KLPc").style.width="100%"
    document.querySelector("div.DLc2vb").style.display="none"
    document.querySelector("div .Riuhhf").style.width = "-webkit-fill-available"
    document.querySelector("div .Jrbdv.tRImzd").style.display = "none"
    document.querySelector('div.C2Jvlf').style.display="none"

    search=document.querySelector("span.RveJvd.snByac")
    // console.log(document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0])

        // console.log("event:",event)
        // console.log("eventsTarget:",event.target)
        // console.log("search:",search)
        document.addEventListener("click",function(event){
        if(search == event.target){
            console.log("reached the target")
            // tempWindow = new BrowserWindow({
            //     height:500,
            //     width:500

            // })

            // tempWindow.on('close', function(){tempWindow=null})
            // tempWindow.loadURL("https://chat.google.com")
            // tempWindow.show()
        }
       else if(initialURL != document.URL){
            initialURL = document.URL
            console.log(initialURL)
            event.preventDefault()
            event.stopPropagation()
            CreateNewWindow(initialURL)
            
            // MainWindow = MainWindow.getCurrentWindow()
            // MainWindow.loadURL("https://google.com")
                
                // win.webContents.executeJavaScript('console.log("on new window");document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0].addEventListener("click",(e)=>{window.close();console.log("preventiing default");})');
                // win.webContents.executeJavaScript('document.querySelector("div .HrE5Tb").style.webkitAppRegion = "drag";')

                // win.webContents.executeJavaScript('document.addEventListener("dblclick",(e)=>{console.log("double click detected");console.log(document.getSelection().toString());});')

                
        }
    });
    
    console.log("JJ")



}