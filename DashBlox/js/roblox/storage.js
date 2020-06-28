var Roblox = Roblox || {};
var DashBlox = DashBlox || {};

Roblox.storage = (() => {
  return {
    CheckValue: async (key) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (data) => {
          if (data.hasOwnProperty(key)){
            resolve(data[key]);
          } else {
            resolve(false);
          }
        })
      })
    }
  }
})();
