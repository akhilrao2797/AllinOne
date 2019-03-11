const electron = require('electron');
const { remote } = electron
const { Menu, MenuItem } = remote
const menu = new Menu()
const path = require('path')
const MainWindow = electron.remote
const BrowserWindow = electron.remote.BrowserWindow
let win
let selectedText

function CreateNewWindow(url) {

    let win = new BrowserWindow(
        {

            alwaysOnTop: true,
            width: 500,
            height: 600,
            maxHeight: 700,
            maxWidth: 600,
            webPreferences: {
                preload: path.join(__dirname, 'chatPreload.js')
            }
        },

    )
    win.webContents.on('before-input-event', () => {
        win.webContents.executeJavaScript(`
        document.querySelector("div.U26fgb.mUbCce.fKz7Od.ETeOHc.pFf6gd")
    .addEventListener("click",(e)=>{
        window.close();
        console.log("close button");
    });
        `)
    })
    win.on('close', function () { win = null })
    win.loadURL(url)
}



window.onload = () => { 
    initialURL = document.URL
    search = document.querySelector("span.RveJvd.snByac")

    document.addEventListener("dblclick", function (event) {
        console.log("doubleclick recieved")
        if (initialURL != document.URL) {
            initialURL = document.URL
            console.log(initialURL)
            event.preventDefault()
            event.stopPropagation()
            CreateNewWindow(initialURL)
        }
    });

    console.log("JJ")

    // creating context menus
    menu.append(new MenuItem({ label: 'open new tab in google chat', click() { console.log('new tab will open in near future') } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'item clicked', type: 'checkbox', checked: true }))
    menu.append(new MenuItem({ role: 'copy' }))
    menu.append(new MenuItem({ role: 'paste' }))
    menu.append(new MenuItem({
        label: 'open compose box in gmail',
        click() {
            console.log("opening the composebox in near future");
            selectedText = document.getSelection().toString();
            popUpCompose(selectedText)
        }
    }));

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        menu.popup()
    }, false)
}

function popUpCompose(selectedText) {
    regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
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
        width: 500,
        height: 600
    })
    let url = "https://mail.google.com/mail/?view=cm&to=" + emailsArray + "&fs=1&body=" + bodyText
    gmailComposeWin.loadURL(url)
    gmailComposeWin.show()
    gmailComposeWin.on('close', () => {
        gmailComposeWin = null
    })
}
