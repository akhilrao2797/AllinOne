const electron = require('electron')
const path = require('path');
window.onload = () => {

    document.querySelector("footer").style.display = 'none';
    document.getElementById("primary_file_button").click()
    document.querySelectorAll("li.file_menu_item")[0].click()
    pre = document.querySelector('pre.CodeMirror-line');
    pre.querySelector('span').innerText = 'hello';



    
   }