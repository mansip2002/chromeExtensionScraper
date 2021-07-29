
// once the content script has completed extracting the selected data it is displayed to the user
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.command == "complete") {
        document.querySelector("textarea").value = JSON.stringify(msg.data);
        document.querySelector("textarea").style.display = "flex";
    }
});

// creates object for one "run" of the search 
function createCommandObject() {

    var searchArray = [];
    var inputs = document.querySelectorAll(".parameters .query");

    for (var i = 0; i < inputs.length; i++) {
        var itemObject = {};
        itemObject.type = inputs[i].querySelector("select").value;
        searchArray.push(itemObject);
    }

    chrome.tabs.query({currentWindow: true, active: true }, function (tabs) {
        
        var object = searchArray;      
        chrome.tabs.sendMessage(tabs[0].id, {command: "input", data: object,});
    });
}

// calls object creation function when user clicks the collect button
document.querySelector(".search").addEventListener("click", function () {
    createCommandObject();
});

// creates a new search query option when user clicks on the add element button 
document.querySelector(".new-search-parameter").addEventListener("click", function () {
    var newItem = `<br/>
    <div class="query">
        <select class="dropdown">
        <option value="date">Date</option>
        <option value="publisher">Journal Name</option>
        <option value="objective">Objective</option>
        <option value="title">Title</option>
        </select>
    </div>`;
    
    document.querySelector(".parameters").innerHTML += newItem;
});
