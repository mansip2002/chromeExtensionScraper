

// get data from input and add to ext
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if (msg.command == "input") {
        window.ScraperExt = [];
        var scrapeObj = msg.data;
        nextSearchItem(scrapeObj, 0);
    }
});


// goes through all search parameters user needs and collects the according data
function nextSearchItem(obj, index) {

    //use !== instead of != 
    if (typeof obj[index] !== "undefined") {
    
        if (obj[index].type == "title") {
            titleEvent(obj, index);
        }

        if (obj[index].type == "publisher") {
            journalEvent(obj, index);
        }

        if (obj[index].type == "objective") {
            infoEvent(obj, index);
        }

        if (obj[index].type == "date") {
            dateEvent(obj, index);
        }

    } else {
        chrome.runtime.sendMessage({command: "complete", data: window.ScraperExt,});
    }
}


// returns the name of the journal the article is published in
function journalEvent(obj, index) {
    var value = document.querySelector("#publication-title > a");
    window.ScraperExt.push(value.innerHTML);
    nextSearchItem(obj, index + 1);
}

// returns the objective or purpose of the article 
function infoEvent(obj, index) {
    var value = document.querySelector("#spar0080");
    window.ScraperExt.push(value.innerHTML);
    nextSearchItem(obj, index + 1);
}

// returns the date of the article was published/available online
function dateEvent(obj, index) {
    var value = document.querySelector("#mathjax-container > div.article-wrapper.u-padding-s-top.grid.row > article > div.Copyright > span");
    window.ScraperExt.push(value.innerHTML);
    nextSearchItem(obj, index + 1);
}

// returns the name of the article
function titleEvent(obj, index) {
    var value = document.getElementById("screen-reader-main-title");
    var title = value.getElementsByTagName("span");
    window.ScraperExt.push(title[0].innerHTML);
    nextSearchItem(obj, index + 1);
}

