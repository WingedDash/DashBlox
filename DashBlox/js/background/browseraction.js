chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.update({url: "https://www.roblox.com/dashblox/settings"});
})