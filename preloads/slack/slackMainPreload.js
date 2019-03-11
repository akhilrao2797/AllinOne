const electron = require('electron')
const path = require('path');
window.onload = () => {
  console.log("Preload Working")  
  document.querySelector("footer").style.display = 'none';
  
   }