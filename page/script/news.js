class News {
   static async getXMLNews(){
      const url = 'https://vnexpress.net/rss/khoa-hoc.rss';
      const xml = await $.get(url);
      const MAX = 4;

      const xmlDoc = $(xml);

      const items = xmlDoc.find("item");

      let out = [];

      for(let i = 0; i < MAX; i++){
         const item = $(items[i]);
         out.push({
            title: item.find("title").text(),
            link: item.find("link").text()
         })
      }
      return out;
   }
}