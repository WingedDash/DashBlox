// Library \\
var Roblox = Roblox || {};

// Page Content \\
var pageContent = {
  contentPages: ["games"],

  requiresId: true,
};

Roblox.pages.CheckPage(location.href, pageContent).then(async (confirmation) => {
  // Asset Review \\
  var placeId = confirmation[1];
  if (!Number(placeId)) return;

  console.log(placeId)

  //$("#rbx-game-server-item-container").empty()
  //javascript:Roblox.RunningGameInstances.fetchServers(${placeId},3000)
})
