const API_KEY = '74c23c2d9a83caffe161458d751d26a2';

class Weather {
   static async getWeatherData(){
      const location = await Location.getCurrentLocation();
      const {latitude, longitude} = location;

      const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      const  weatherData = await $.get(apiURL);

      let temp = Math.round(weatherData.main.temp - 273.15),
         {name} = weatherData,
         weather = weatherData.weather[0];
      let iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png";

      return {
         temp, name, weather, iconURL
      }
   }
}