// Library \\
var Roblox = Roblox || {};

$(".icon-robux-28x28.roblox-popover-close").ready(async () => {
  let SettingEnabled = await Roblox.storage.CheckValue("oldicons");
  
  if (SettingEnabled){
    try {
      var RobuxIcon = $(".icon-robux-28x28.roblox-popover-close");

      RobuxIcon.removeClass("icon-robux-28x28");
      RobuxIcon.addClass("icon-nav-robux");
      //$(".gotham-font").removeClass("gotham-font");

      //if ($(".border-top.border-bottom.game-stats-container.follow-button-enabled")){
      //  $(".border-top.border-bottom.game-stats-container.follow-button-enabled").addClass("gotham-font");
      //}

      //if ($(".list-item.item-card.recommended-item.ng-scope")){
      //    $(".list-item.item-card.recommended-item.ng-scope").addClass("gotham-font");
      //}

      $(".font-header-2.nav-menu-title.text-header")[1].text = "Catalog";
      $(".btn-growth-md.btn-secondary-md")[0].text = "Upgrades";
    } catch {
      console.log("Page dosn't support themes.");
    }
  }
})
// This needs moved because this was originally a developer feature. \\
