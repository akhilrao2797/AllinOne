const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
let composeWindow;
const {remote} = electron
const {Menu, MenuItem} = remote
const menu = new Menu()


const composeWindowFunction = () => {
    document.querySelector('div.z0').innerHTML = "<button class='all-in-one-btn T-I J-J5-Ji T-I-KE L3'>Compose</button>"
    // Disable hangout
    document.querySelector('[aria-label="Hangouts"]').style.display='none';
    document.querySelector('div.aeQ').style.display='none';
    document.querySelector('span.J-Ke.n4.ah9').style.display='none';
    document.querySelector('div.gb_w.gb_Tc.gb_f.gb_xf').style.display = 'none'; // google apps done
    document.querySelector('div.gb_uc.gb_Tc.gb_f.gb_vc.gb_xf').style.display = 'none' //notfication disable

    document.querySelector('button.all-in-one-btn').addEventListener('click', () => {
        composeWindow = new BrowserWindow({
            width: 500, height: 600,modal:true, webPreferences: {
                nodeIntegration: false
            }
        })
        composeWindow.loadURL('https://mail.google.com/mail/?view=cm&fs=1')
        composeWindow.show();
    })
}

window.onload = () => {
    composeWindowFunction();

    // // creating context menus
    // menu.append(new MenuItem({ label: 'open new tab in gmail', click() { console.log('new tab will open in near future') } }))
    // menu.append(new MenuItem({ type: 'separator' }))
    // menu.append(new MenuItem({ label: 'item clicked', type: 'checkbox', checked: true }))

    // document.addEventListener('contextmenu', (e) => {
    //     e.preventDefault()
    //     menu.popup({ window: remote.getCurrentWindow() })
    // }, false)
}


