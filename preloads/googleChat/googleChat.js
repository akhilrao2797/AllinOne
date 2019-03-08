const electron = require('electron')
// const { globalShortcut } = require('electron')
const {remote} = electron
const {Menu, MenuItem} = remote
const googleChatmenu = new Menu()
const path = require('path')
const {ipcRenderer} = require('electron')
// const ipc = electron.ipcRenderer
// const remote = electron.remote
const MainWindow = electron.remote
const BrowserWindow = electron.remote.BrowserWindow
let win
let selectedText

function CreateNewWindow(url){
    
    let win = new BrowserWindow(
        {   
            
            alwaysOnTop:true,
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
    win.webContents.on('before-input-event',()=>{
        win.webContents.executeJavaScript(`
        document.querySelector("div.U26fgb.mUbCce.fKz7Od.ETeOHc.pFf6gd")
    .addEventListener("click",(e)=>{
        window.close();
        console.log("close button");
    });
        `)
    })
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

//     contentlist = document.querySelectorAll("div.Eb3cg")
// for ( item of contentlist) {
//     item.addEventListener("click", function(event){
//         console.log("clicked recieved")
//         // console.log("item:",item)
//         // console.log(item.offsetParent.getAttribute("data-group-id"))
//     })   

    initialURL = document.URL
    // console.log("preload working")
    // // document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0].style.display = "none"
    // document.querySelector("div.X9KLPc").style.width="100%"
    // document.querySelector("div.DLc2vb").style.display="none"
    // document.querySelector("div .Riuhhf").style.width = "-webkit-fill-available"
    // document.querySelector("div .Jrbdv.tRImzd").style.display = "none"
    // document.querySelector('div.C2Jvlf').style.display="none"

    search=document.querySelector("span.RveJvd.snByac")
    
    // console.log(contentlist)
    // console.log(document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0])

        // console.log("event:",event)
        // console.log("eventsTarget:",event.target)
        // console.log("search:",search)
        
        document.addEventListener("dblclick",function(event){
            console.log("doubleclick recieved")
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

    // // creating context menus
    googleChatmenu.append(new MenuItem({ label: 'open new tab in google chat', click() { console.log('new tab will open in near future') } }))
    googleChatmenu.append(new MenuItem({ type: 'separator' }))
    googleChatmenu.append(new MenuItem({ label: 'item clicked', type: 'checkbox', checked: true }))
    googleChatmenu.append(new MenuItem({role:'copy'}))
    googleChatmenu.append(new MenuItem({role:'paste'}))
    googleChatmenu.append(new MenuItem({
        label: 'open compose box in gmail',
        click() {
            selectedText = document.getSelection().toString();
            popUpCompose(selectedText)
        }
    }));
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        googleChatmenu.popup()
        // ipcRenderer.send('show-context-menu')
    })

    
}

function popUpCompose(selectedText){
    regex=/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    var found;
    var indexArray=[];
    var bodyText,strindex;
    var emailsArray = selectedText.match(regex);
    if (emailsArray!=null){

        if(emailsArray!=null && emailsArray.length){
            while((found=regex.exec(selectedText)) !==null){
            indexArray.push(found.index)
            }
                strindex=indexArray[emailsArray.length-1]+emailsArray[emailsArray.length-1].length
                // emails are in front and body comes after
                if(strindex != selectedText.length){
                    bodyText = selectedText.slice(strindex)
                }
                // body comes front so put everything in bodytext
                else{
                    bodyText = selectedText
                }
                
            }
    }
    
        else 
        {
            console.log('in else')
            // put the selected text in the body
            bodyText = selectedText;
            emailsArray="";
        }

    let gmailComposeWin = new BrowserWindow({
        width:500,
        height:600
    })
    let url = "https://mail.google.com/mail/?view=cm&to="+emailsArray+"&fs=1&body="+bodyText
    gmailComposeWin.loadURL(url)
    gmailComposeWin.show()
    gmailComposeWin.on('close',()=>{
        gmailComposeWin = null
    })
}