$(async () => {
  $("#information").click(() => {
    let active = $(".active");
    let ctabname = "information";
    let tabname = active[0].id;
    active.removeClass("active");
    $(`.dashblox-${tabname}`).attr("hidden", "");
    $(`.dashblox-${ctabname}`).removeAttr("hidden");
    $(`#${ctabname}`).addClass("active");
  })

  $("#item-details").click(() => {
    let active = $(".active");
    let ctabname = "item-details";
    let tabname = active[0].id;
    active.removeClass("active");
    $(`.dashblox-${tabname}`).attr("hidden", "");
    $(`.dashblox-${ctabname}`).removeAttr("hidden");
    $(`#${ctabname}`).addClass("active");
  })

  $("#experimental").click(() => {
    let active = $(".active");
    let ctabname = "experimental";
    let tabname = active[0].id;
    active.removeClass("active");
    $(`.dashblox-${tabname}`).attr("hidden", "");
    $(`.dashblox-${ctabname}`).removeAttr("hidden");
    $(`#${ctabname}`).addClass("active");
  })

  function getData(key) {
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

  function setData(key, value) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({[key]: value}, (data) => {
        resolve(data);
      })
    })
  }

  // Item Stats \\
  let itemDetails = await getData("itemstats");
  let ownersList = await getData("ownerslist");

  // Experimental \\
  let oldIcons = await getData("oldicons");

  if (itemDetails){
    $(".dashblox-item-details").addClass("on");
  }
  if (ownersList){
    $(".dashblox-owners-list").addClass("on");
  }
  if (oldIcons){
    $(".dashblox-crc").addClass("on");
  }

  $(".btn-toggle.dashblox-item-details").click(async () => {
    if (itemDetails){
      setData("itemstats", false);
      $(".dashblox-item-details").removeClass("on");
    } else {
      setData("itemstats", true);
      $(".dashblox-item-details").addClass("on");
    }
    itemDetails = await getData("itemstats");
  })

  $(".btn-toggle.dashblox-owners-list").click(async () => {
    if (ownersList){
      setData("ownerslist", false);
      $(".dashblox-owners-list").removeClass("on");
    } else {
      setData("ownerslist", true);
      $(".dashblox-owners-list").addClass("on");
    }
    ownersList = await getData("ownerslist");
  })

  $(".btn-toggle.dashblox-crc").click(async () => {
    if (oldIcons){
      setData("oldicons", false);
      $(".dashblox-crc").removeClass("on");
    } else {
      setData("oldicons", true);
      $(".dashblox-crc").addClass("on");
    }
    oldIcons = await getData("oldicons");
  })

})
