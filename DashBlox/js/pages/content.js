$("#settings-icon").ready(() => {
  $("#settings-icon").click(() =>{
    $("#settings-popover-menu").ready(() => {
      if (!$("#dashblox-settings-toggle").length){
        $("#settings-popover-menu").prepend(`<li id="dashblox-settings-toggle"><a class="rbx-menu-item">DashBlox</a></li>`).click(() => {
          chrome.runtime.sendMessage({});
        })
      }
    })
  })
})

chrome.storage.local.get("setup", (data) => {
  if (!data.hasOwnProperty("setup")){
    chrome.storage.local.set({"itemstats": true});
    chrome.storage.local.set({"ownerslist": true});
    chrome.storage.local.set({"setup": true});
  }
})
