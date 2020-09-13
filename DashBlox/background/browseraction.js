chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.update({ url: chrome.runtime.getURL("settings/settings.html") });
});
