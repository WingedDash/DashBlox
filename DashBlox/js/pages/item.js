// Library \\
var Roblox = Roblox || {};

// Page Content \\
var pageContent = {
  contentPages: ["catalog", "library"],

  requiresId: true,
};

Roblox.pages.CheckPage(location.href, pageContent).then(async (confirmation) => {
  // Asset Review \\
  var assetId = confirmation[1];
  if (!Number(assetId)) return;

  // Item Review \\
  var item = await Roblox.catalog.getItemInfo(assetId);
  if (!item) return;

  console.log(item)

  // Storage \\
  var ITEMSTATS_ENABLED = await Roblox.storage.CheckValue("itemstats");
  var OWNERLIST_ENABLED = await Roblox.storage.CheckValue("ownerslist");

  // Item Stats \\
  if (ITEMSTATS_ENABLED){
    $(`.clearfix.toggle-target.item-field-container`).ready(() => {
      var description = $(`.clearfix.toggle-target.item-field-container`);

      if (item.Creator.Id != 1){
        $(".clearfix.item-field-container:contains('Updated')").remove();
      }

      description.before(`<div id="sales" class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${Roblox.pages.formatTime(item.Created)}</span></div>`);
      description.before(`<div id="sales" class="clearfix item-field-container item-created"><div class="text-label field-label">Updated</div><span class="field-content ">${Roblox.pages.formatTime(item.Updated)}</span></div>`)
      description.before(`<div id="sales" class="clearfix item-field-container item-sales"><div class="text-label field-label">Sales</div><span class="field-content ">${item.Sales.toLocaleString()}</span></div>`);
    })
  }
  // Owner List \\
  if (OWNERLIST_ENABLED){
    $("#recommendations-container").ready(async () => {
      $(".container-header.recommendations-header").append(`<button type="button" id="dashblox-recommended" style="float: right;" class="btn-buy-xs">Recommended</button>`);
      $(".container-header.recommendations-header").append(`<button type="button" id="dashblox-ownerlist" style="float: right;" class="btn-buy-xs">Owners</button>`);

      // OwnerList Tab \\
      $(".container-list.layer.recommendations-container").append(`<div class="dashblox-ownerlist vlist" style="display: none;"></div>`);

      // Ownerlist function \\
      var cursor = "";
      var prevcursor = "";
      var nextcursor = "";

      var pageNumber = 0;

      var loading = false;
      var timeoutBusy = false;

      var LoadOwners = async () => {
        if (cursor != nextcursor && cursor != prevcursor){return}; // Prevents same ownerslist being loaded
        if (!loading && !timeoutBusy){
          loading = true;

          if (cursor == nextcursor){pageNumber++;} else if (cursor == prevcursor){pageNumber--;}

          var ownerlist = $(".dashblox-ownerlist.vlist");
          ownerlist.empty();

          var deletedNumber = 0;

          ownerlist.prepend(`<span class="dashblox-spinner spinner spinner-default" style="height: 100px;"></span>`);
          ownerlist.prepend(`<div class="pages-list"><a class="text-name previous-page">Previous Page</a> <a class="text-name next-page" style="float: right;">Next Page</a> <center> <span class="dashblox-deleted-private-page">Deleted/Private: ${deletedNumber} Page: ${pageNumber}</span> </center> </div>`);

          Roblox.catalog.getOwnersOfAsset(item.AssetId, cursor).then(async (details) => {
            if (details.owners != null){
              details.owners.forEach(async (owner, index) => {
                let rOwner = owner.owner;
                if (!timeoutBusy){
                  if (rOwner){
                      var thumbail = `https://www.roblox.com/headshot-thumbnail/image?userId=${rOwner.userid}&width=60&height=60&format=png`;

                      if (item.IsLimitedUnique) {
                        ownerlist.append(`<div class="list-item dashblox-owner-profile"> <a class="list-header" href="https://www.roblox.com/users/${rOwner.userid}/profile"> <img class="avatar-headshot-md" src="${thumbail}" draggable="false"> </img>  </a> <a class="text-name" href="https://www.roblox.com/users/${rOwner.userid}/profile">${rOwner.username}</a> <br> <span style="font-size: 12px;">Owned Since: ${Roblox.pages.formatTime(owner.created)}</span> <br> <span style="font-size: 12px;">Owner Updated: ${Roblox.pages.formatTime(owner.updated)}</span> <span style="float: right; font-size: 15px;">Serial: ${owner.serialNumber ? "#" + owner.serialNumber : "N/A"}</span> </div>`);
                      } else {
                        ownerlist.append(`<div class="list-item dashblox-owner-profile"> <a class="list-header" href="https://www.roblox.com/users/${rOwner.userid}/profile"> <img class="avatar-headshot-md" src="${thumbail}" draggable="false"> </img>  </a> <a class="text-name" href="https://www.roblox.com/users/${rOwner.userid}/profile">${rOwner.username}</a> <br> <span style="font-size: 12px;">Owned Since: ${Roblox.pages.formatTime(owner.created)}</span> <br> <span style="font-size: 12px;">Owner Updated: ${Roblox.pages.formatTime(owner.updated)}</span> </div>`);
                      }
                  } else {
                    deletedNumber++;
                  }
                } else {
                  $(".dashblox-owner-profile").remove();
                }
              })
            } else {
              timeoutBusy = true;

              ownerlist.empty();
              ownerlist.append(`<center> <p class="dashblox-ownerlist-counter">Slow down there! Please allow up to a minute before trying to load owners again.</p> </center>`);

              setTimeout(() => {
                loading = false;
                timeoutBusy = false;
                cursor = prevcursor;
                LoadOwners();
              }, 60000)
            }

            $(".dashblox-spinner").remove();

            if ($(".dashblox-deleted-private-page").length == 1){
              $(".dashblox-deleted-private-page")[0].innerText = `Deleted/Private: ${deletedNumber} Page: ${pageNumber}`
            }

            $(".text-name.previous-page").click(function(){
              if (prevcursor){
                cursor = prevcursor;
                LoadOwners();
              }
            })

            $(".text-name.next-page").click(function(){
              if (nextcursor){
                cursor = nextcursor;
                LoadOwners();
              }
            })

            if (!timeoutBusy){
              prevcursor = details.cursors.previous;
              nextcursor = details.cursors.next;
              loading = false;
            }
          })
        }
      }

      // Button Events \\
      $("#dashblox-ownerlist").click(function() {
        $(".recommended-items-slider")[0].style = "display: none;";
        $(".dashblox-ownerlist.vlist")[0].style = "";
        $(".container-header.recommendations-header")[0].children[0].innerText = "Owners";
        LoadOwners();
      })

      $("#dashblox-recommended").click(function() {
        $(".recommended-items-slider")[0].style = "";
        $(".dashblox-ownerlist.vlist")[0].style = "display: none;";
        $(".container-header.recommendations-header")[0].children[0].innerText = "Recommended";
      })
    })
  }
})
