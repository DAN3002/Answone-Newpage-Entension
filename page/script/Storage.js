class Storage {
   static getItem(key) {
      return new Promise(function(resolve, reject) {
         chrome.storage.sync.get([key], function(result) {
            resolve(result[key]);
         });
      });
   }
   static setItem(key, value) {
      let query = {};
      query[key] = value;

      return new Promise(function(resolve, reject) {
         chrome.storage.sync.set(query, () => {
            resolve(true);
         });
      });

   }
}