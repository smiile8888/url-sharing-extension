// contextMenu showing on the menu when right click on the webpage
var contextMenuItem = {
    "id": "selectionContent",
    "title": "Share",
    "contexts": ["selection"]
};

var fbContextMenu = {
    "id": "fb",
    "title": "Facebook",
    "contexts": ["selection"],
    "parentId": "selectionContent",
    "onclick": function (tab) {
        let selection = parseContent(tab);
        shareToFB(selection);
    }
}

var messengerContextMenu = {
    "id": "messenger",
    "title": "Messenger",
    "contexts": ["selection"],
    "parentId": "selectionContent",
    "onclick": function (tab) {
        let selection = parseContent(tab);
        sendToMessenger(selection);
    }
}

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
    let selection = {};
    selection.url = tab.linkUrl ? tab.linkUrl : tab.pageUrl;
    selection.text = tab.selectionText ? tab.selectionText : '';
    console.log(selection);

    return selection;
}

function shareToFB(selection) {
    FB.ui({
        display: 'popup',
        method: 'share',
        quote: selection.text,
        href: selection.url,
    });
}

function sendToMessenger(selection) {
    FB.ui({
        method: 'send',
        display: 'popup',
        link: selection.url
    });
}

chrome.browserAction.onClicked.addListener(getURL);
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.create(fbContextMenu);
chrome.contextMenus.create(messengerContextMenu);
// chrome.contextMenus.onClicked.addListener(parseContent);
window.fbAsyncInit = function () {
    FB.init({
        appId: '235948987509703',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v6.0'
    });
};