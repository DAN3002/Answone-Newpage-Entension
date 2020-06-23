$(document).ready(function() {
   initUsername();
   initWeather();
   initDate();
   initNews();

   Todo.init();
});

async function initWeather() {
   const weatherData = await Weather.getWeatherData();

   $(".location").text(weatherData.name);
   $(".degree > .num").html(weatherData.temp  + "<sup>o</sup>C");
   $("#weather-icon").attr("src", weatherData.iconURL);
}

async function initUsername() {
   let username = await Storage.getItem('username');

   if(!username){
      username = askUsername();
      Storage.setItem('username', username);
   }

   const title = `Welcome back ${username}!`;
   $("#title").text(title);
}

function initDate() {
   const  date = new Date();
   const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
   const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(date)

   $("#current-date").text(`${day}/${month}/${year}`);
}

async function initNews(){
   const news = await News.getXMLNews();

   const container = $($(".news-container")[0]);

   news.forEach((item, i) => {
      const html = `<li><a href = "${item.link}">${item.title}</a></li>`;
      container.append($(html));
   });


}

function askUsername() {
   let output = prompt('Input your name: ');

   if(!output) return askUsername();

   return output;
}