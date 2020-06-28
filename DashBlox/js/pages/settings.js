// Library \\
var Roblox = Roblox || {};

// Page Content \\
var pageContent = {
  contentPages: ["home?settings=dashblox"],

  requiresId: false,
};

var Containers = ["About", "Catalog"];

var Settings = {
  ["Catalog"]: {
    ["ItemStats"]: {
      key: "itemstats",
      value: true,
      changeable: true,
      defaultvalue: true
    },
    ["OwnersList"]: {
      key: "ownerslist",
      value: true,
      changeable: true,
      defaultvalue: true
    }
  }
}

var ChangeKey = (key, value, toggle) => {
  chrome.storage.local.set({[key]: value}, (successful) => {
    console.log(successful);
  })
}

var LoadContainer = (container) => {
  console.log(container)
  if (container == "About"){

  } else {

  }
}

Roblox.pages.CheckPage(location.href, pageContent).then(async (confirmation) => {
  // Start \\
  $(".content").empty();
  $(".content").addClass("dashblox-settings");

  // Beta junk \\
  $(".content.dashblox-settings").append(`<div class="page-content" id="dashblox-settings"></div>`);
  $("#dashblox-settings").append(`<div class="section"> <h1>DashBlox Settings</h1> </div>`);
  $("#dashblox-settings").append(`<div class="rbx-tabs-vertical" style="float: left; width: 180px"> <ul id="vertical-tabs" class="nav nav-tabs nav-stacked rbx-tabs-vertical" role="tablist"> </ul> </div>`);

  var selected = "About";

  var containers = {};

  for (name of Containers){
    $("#vertical-tabs").append(`<li class="rbx-tab" id="dashblox-container-${name}"> <a class="rbx-tab-heading"> <span class="text-lead">${name}</span> </a> </li>`),
    containers[name] = $(`#dashblox-container-${name}`);
  }

  //for (name in containers) {
  //  document.getElementById(`dashblox-container-${name}`).addEventListener("click", () => {
  //    if (!containers[name].hasClass("active")){
  //      for (element in containers) {
  //        if (containers[element].hasClass("active")){
  //          containers[element].removeClass("active");
  //        }
  //      }
  //      containers[name].add("active");
  //      LoadContainer(name);
  //    }
  //  })
  //}
  containers["About"].click(() => {
    if (!containers["About"].hasClass("active")){
      for (element in containers) {
        if (containers[element].hasClass("active")){
          containers[element].removeClass("active");
        }
      }
      containers["About"].add("active");
      LoadContainer("About");
    }
  })

  containers["Catalog"].click(() => {
    if (!containers["Catalog"].hasClass("active")){
      for (element in containers) {
        if (containers[element].hasClass("active")){
          containers[element].removeClass("active");
        }
      }
      containers["Catalog"].add("active");
      LoadContainer("Catalog");
    }
  })
})
