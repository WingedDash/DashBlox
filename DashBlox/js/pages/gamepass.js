// Library \\
var Roblox = Roblox || {};

// Page Content \\
var pageContent = {
  contentPages: ["game-pass"],

  requiresId: true
};

Roblox.pages.CheckPage(location.href, pageContent).then(async (confirmation) => {
  // Gamepass review \\
  var gamepassId = confirmation[1];
  if (!Number(gamepassId)) return;

  var gamepass = await Roblox.catalog.getGamepassInfo(gamepassId);

  console.log(gamepass)

  // Item Stats \\
  var itemdetails = $(`.clearfix.toggle-target.item-field-container`);

  if (gamepass.Creator.Id != 1){
    $(".clearfix.item-field-container:contains('Updated')").remove();
  }

  itemdetails.before(`<div id="sales" class="clearfix item-field-container item-created"><div class="text-label field-label">Created</div><span class="field-content ">${Roblox.pages.formatTime(gamepass.Created)}</span></div>`);
  itemdetails.before(`<div id="sales" class="clearfix item-field-container item-created"><div class="text-label field-label">Updated</div><span class="field-content ">${Roblox.pages.formatTime(gamepass.Updated)}</span></div>`)
  itemdetails.before(`<div id="sales" class="clearfix item-field-container item-sales"><div class="text-label field-label">Sales</div><span class="field-content ">${gamepass.Sales.toLocaleString()}</span></div>`);
})
