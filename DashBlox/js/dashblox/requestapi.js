var DashBlox = DashBlox || {};

DashBlox.api = (function() {
  return {
    get: function(api, args, runtime) {
      return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage({api: api, args: args, runtime: "GET"}, function(response) {
          if (response){resolve(response)}
          reject([{
            code: 0,
            message: "Something went wrong fetching api."
          }])
        })
      })
    },

    post: function(api, args, runtime) {
      return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage({api: api, args: args, runtime: "POST"}, function(response) {
          if (response){resolve(response)}
          reject([{
            code: 0,
            message: "Something went wrong fetching api."
          }])
        })
      })
    }
  }
})();
