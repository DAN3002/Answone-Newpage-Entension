class Todo{
   static init(){
      this.render();

      const self = this;
      $(".addBtn").click(function(event) {
         self.addItem(self);
      });
   }
   static async render(){
      const items = await Storage.getItem('todo-item') || [];

      this.items = items;

      const list = $($(".todo-list")[0])
      list.html("");

      items.forEach((item, i) => {
         const html = `<li data-index = ${i}>${item.title}</li>`;
         const el = $(html);

         if(item.checked) el.addClass('checked');

         const closeBtn = $(`<span class="close" data-index = ${i}>×</span>`);
         el.append(closeBtn);

         const self = this;
         el.click(async function(event) {
            const index = $(this).attr('data-index');
            $(this).toggleClass('checked');

            let items = self.items;
            items[index].checked = !items[index].checked;

            await Storage.setItem('todo-item', self.items);
         });

         closeBtn.click(async function(event) {
            const index = $(this).attr('data-index');
            self.items.splice(index, 1);
            await Storage.setItem('todo-item', self.items);
            $(`li[data-index=${index}]`).hide();
         });


         list.append(el);
      });
   }

   static async addItem(self){
      const title = $(".todo-list-container input").val();

      if(!title) {
         alert('input title');
         return;
      }

      $(".todo-list-container input").val("");

      const el = {
         title, check: false
      };

      self.items.push(el);
      await Storage.setItem('todo-item', self.items);

      self.render();
   }
}