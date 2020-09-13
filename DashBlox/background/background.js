var RunTimeTypes = {
  ["GET"]: function(api, args, sendMessage) {
    return $.get(api, args, sendMessage);
  },
  ["POST"]: function(api, args, sendMessage) {
    return $.post(api, args, sendMessage);
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendMessage){
  if (!message.runtime){
    chrome.tabs.update({ url: chrome.runtime.getURL("settings/settings.html") });
  } else {
    RunTimeTypes[message.runtime](message.api, message.args, sendMessage);
  }
  return true;
})
