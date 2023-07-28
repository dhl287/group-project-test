// unique API key
var apiKey = "0aec531cfccd4364841446fc91ca9602";

var main = $('main');
var form = $('#form');
var search = $('#search');
var city = '';

// `https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation}&key=0aec531cfccd4364841446fc91ca9602`

// use API to get weather alerts by location, fetch request
function getAlertsByLocation() {
    city = document.getElementById("search").value;
    fetch(`https://api.weatherbit.io/v2.0/alerts?city=${city}&key=0aec531cfccd4364841446fc91ca9602`)
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        addAlertsToPage(respData)
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
      document.getElementById("search").value = "";
  }

  // add alerts to page, Rico will ask tutor about adding if/then statements for # of alerts
      function addAlertsToPage(data){
          var cityAlerts = document.createElement('div')
          cityAlerts.classList.add('weather');

          cityAlerts.innerHTML = `
          <h4>${data.city_name}</h4>
          <p> country_code: ${data.country_code}</p>
          <p> lat: ${data.lat}</p>
          <p> lon: ${data.lon}</p>
          <p> state_code: ${data.state_code}</p>
          <p> timezone: ${data.timezone}</p>
          
          
        
          `;
/*        weather.innerHTML = `
            <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°F <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
            <h4>${data.weather[0].main}</h4>
            <h4>Humidity: ${data.main.humidity}</h4>
            <h4>Wind Speed: ${data.wind.speed}</h4>
            `;
            */


          main.innerHTML= "";
           main.append(cityAlerts);
      };

      document.getElementById("searchBtn").addEventListener("click", getAlertsByLocation);

      document.getElementById("clearBtn").addEventListener("click", () =>{
        document.getElementById("search").value = "";
      });

     // click search button event
     form.on('submit',(event) =>{
      console.log("SUBMIT")
        event.preventDefault();

        city = search.val();
        console.log(city);
        if(city){
            getAlertsByLocation()
        }

     });