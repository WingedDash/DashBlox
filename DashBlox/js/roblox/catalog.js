var Roblox = Roblox || {};
var DashBlox = DashBlox || {};

Roblox.catalog = (() => {
  return {
    getItemInfo: async (assetid) => {
      return new Promise((resolve, reject) => {
        if (!assetid){reject({message: "Invalid AssetId"})};

        var item = DashBlox.api.get("https://api.roblox.com/marketplace/productinfo", {assetId: assetid});
        if (!item){reject({message:"Error finding item"})};

        resolve(item);
      })
    },

    getGamepassInfo: async (gamepassId) => {
      return new Promise((resolve, reject) => {
        if (!gamepassId){reject({message: "Invalid GamePassId"})};

        var gamepass = DashBlox.api.get("https://api.roblox.com/marketplace/game-pass-product-info", {gamePassId: gamepassId});
        if (!gamepass){reject({message:"Error finding gamepass"})};

        resolve(gamepass);
      })
    },

    getOwnersOfAsset: async (assetid, cursor) => {
      return new Promise((resolve, reject) => {
        if (!assetid){reject({message: "Invalid AssetId"})};

        var link = `https://inventory.roblox.com/v2/assets/${assetid}/owners?sortOrder=Asc&limit=100`
        if (cursor) {
          link = link + `&cursor=${cursor}`
        }

        DashBlox.api.get(link, {}).then((data) => {
          var indexed = 0;
          var deletedindex = 0;

          var catched = false;

          var finish = () => {
            indexed++;
            if (indexed === data.data.length - deletedindex && catched === false) {
              resolve({
                owners: data.data,
                cursors: {
                  previous: data.previousPageCursor,
                  next: data.nextPageCursor
                }
              })
            }
          }

          if (data) {
            data.data.forEach((owner, index) => {
              let rOwner = owner.owner;
              if (rOwner){
                $.get(`https://api.roblox.com/users/${owner.owner.id}`).then((getOwner) => {
                  rOwner.username = getOwner.Username;
                  rOwner.userid = getOwner.Id;
                  finish();
                }).catch(() => {
                  catched = true;
                  resolve({
                    owners: null,
                    message: "Browser couldn't handle anymore",
                    cursors: {
                      previous: null,
                      next: null
                    }
                  })
                })
              } else {
                deletedindex++;
              }
            })
          } else {
            reject({message: "Error getting owners"})
          }
        })
      })
    }
  }
})();
