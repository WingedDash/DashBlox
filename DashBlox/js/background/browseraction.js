chrome.action.onClicked.addListener(() => {
    let currentSubDomain = settings.get("currentSubDomain") || "www.roblox.com";
    chrome.tabs.update({url: `https://${currentSubDomain}/dashblox/settings`});
})