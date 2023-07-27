// unique API key
var apiKey = "0aec531cfccd4364841446fc91ca9602";

var main = $('main');
var form = $('#form');
var search = $('#search');
var city = '';

// use API to get weather alerts by location, fetch request
function getWeatherAletsByLocation() {
    fetch(`https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation(EX:LosAngeles,CA)}&key=0aec531cfccd4364841446fc91ca9602
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        if(respData != null){
        fetch('https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation(EX:LosAngeles,CA)}&key=0aec531cfccd4364841446fc91ca9602').then(
          (resp) => resp.json()
        ).then(
          (respData) => {
            console.log
            addWeatherToPage(respData)
          }
        )
        }
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  // add weather info to page and HTML
      function addWeatherToPage(data){
          var temp = Ktof(data.main.temp);

          var weather = document.createElement('div')
          weather.classList.add('weather');
          
          weather.innerHTML = `
          <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <h4>${data.weather[0].main}</h4>
          <h4>Humidity: ${data.main.humidity}</h4>
          <h4>Wind Speed: ${data.wind.speed}</h4>
          `;

          main.innerHTML= "";
           main.append(weather);
      };

    // Kelvin to Fahrenheit formula
     function Ktof(K){
         return Math.floor((K - 273.15) * 1.8 + 32);
     }

     // click search button event
     form.on('submit',(event) =>{
      console.log("SUBMIT")
        event.preventDefault();

        city = search.val();
        console.log(city);
        if(city){
            getWeatherByLocation()
        }

     });