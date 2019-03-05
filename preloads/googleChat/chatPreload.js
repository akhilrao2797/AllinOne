

console.log("hello from  chat preload")

console.log("on new window");
window.onload = ()=>{
    document.getElementsByClassName("U26fgb mUbCce fKz7Od ETeOHc pFf6gd")[0]
    .addEventListener("click",(e)=>{
        window.close();
        console.log("close button");
    });

    document.querySelector("div .HrE5Tb").style.webkitAppRegion = "drag";

    document.addEventListener("dblclick",(e)=>{
        console.log("double click detected");
        console.log(document.getSelection().toString());
    });
}
