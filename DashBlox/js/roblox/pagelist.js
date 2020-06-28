var Roblox = Roblox || {};

Roblox.pages = (() => {
  return {
    getPage: function(url){
      var url_array = url.split("/");
      return {
        page: url_array[3],
        id: url_array[4]
      }
    },

    CheckPage: (url, pageContent) => {
      return new Promise(function(resolve, reject) {
        var urlInfo = Roblox.pages.getPage(location.href);

        if (pageContent){
          for (var index in pageContent.contentPages){
            var pValue = pageContent.contentPages[index];
            if (urlInfo.page == pValue){
              if (pageContent.requiresId){
                resolve([true, urlInfo.id]);
                break
              }
              resolve([true, false]);
              break;
            }
          }
        } else {
          reject({code:0,message:"No pageContent!"});
        }
      })
    },

    formatTime: function(date){
        date = new Date(date);
			  var hours = date.getHours();
			  var minutes = date.getMinutes();
			  var zone = hours >= 12 ? 'PM' : 'AM';
			  hours = hours % 12;
			  hours = hours ? hours : 12;
			  minutes = minutes < 10 ? '0'+minutes: minutes;
			  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} @ ${hours}:${minutes} ${zone}`;
		}

  }
})();
