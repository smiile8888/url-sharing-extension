// contextMenu showing on the menu when right click on the webpage
var contextMenuItem = {
    "id": "selectionContent",
    "title": "Share",
    "contexts": ["selection"]
};

chrome.browserAction.onClicked.addListener(getURL);
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(parseContent);

/**
 * Get the URL of current page
 * @param {tab} tab 
 */
function getURL(tab) {
    console.log(tab.url);
    return tab.url;
}

/**
 * Parsing the content of selection
 * @param {tab} tab 
 */
function parseContent(tab) {
    var selection = {};
    selection.url = tab.linkUrl ? tab.linkUrl : tab.pageUrl;
    selection.text = tab.selectionText ? tab.selectionText : '';
    console.log(selection);

    return selection;
}
