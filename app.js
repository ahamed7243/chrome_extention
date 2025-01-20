let alllinks = [];


const input = document.getElementById("input");
const savebtn = document.getElementById("saveBtn");
const tabBtn = document.getElementById("tabBtn");
const deleteBtn = document.getElementById("deleteBtn");
const list = document.getElementById("list");




let getElementFromLocalStore = JSON.parse(localStorage.getItem("links"));
if(getElementFromLocalStore){
    alllinks = getElementFromLocalStore;
    rendeerarr(alllinks);
}



function rendeerarr(arr){
    list.innerHTML = "";
    arr.forEach(item =>{
        list.innerHTML += `
                   <li><a href=${item} target="_blank">${item}</a></li>
        ` });

}




savebtn.addEventListener("click", () =>{
    let links = input.value
    alllinks.push(links);
// console.log(alllinks);
    input.value = "";
    localStorage.setItem("links", JSON.stringify(alllinks));
    rendeerarr(alllinks);

  

});

deleteBtn.addEventListener("click", () =>{
    localStorage.clear();
    alllinks = [];
    rendeerarr(alllinks);
});

tabBtn.addEventListener("click", () =>{
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0].url;
        alllinks.push(activeTab);
        localStorage.setItem("links" , JSON.stringify(alllinks));
        rendeerarr(alllinks);



      });
      
});
