// unique API key
var apiKey = "0aec531cfccd4364841446fc91ca9602";

var main = $('main');
var form = $('#form');
var search = $('#search');
var city = '';

// `https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation}&key=0aec531cfccd4364841446fc91ca9602`

// use API to get weather alerts by location, fetch request
function getAlertsByLocation() {
    fetch(`https://api.weatherbit.io/v2.0/alerts?city=${city}&key=0aec531cfccd4364841446fc91ca9602`)
      .then((resp) => resp.json())
      .then((respData) => {
        console.log(respData);
        addAlertsToPage(respData)
        
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }

  // add alerts to page, Rico will ask tutor about adding if/else statements for # of alerts
      function addAlertsToPage(data){
          var cityAlerts = document.createElement('div')
          cityAlerts.classList.add('weather');

          cityAlerts.innerHTML = `
          <h4>${data.alerts[0].title}</h4>
          
need to add if/else statements
        // if(${data.alerts[0].title} === 0) {
        //  cityAlerts.innerHTML = '
        //  <h4>${data.alerts[0].title}</h4>
        //  } else {

        //   }
          
        
          `; 
        
          main.innerHTML= "";
           main.append(cityAlerts);
      };

// need to configure searchBtn and clearBtn
      document.getElementById("searchBtn").addEventListener("click", getAlertsByLocation());

     // click enter, results show
     form.on('submit',(event) =>{
      console.log("SUBMIT")
        event.preventDefault();

        city = search.val();
        console.log(city);
        if(city){
            getAlertsByLocation()
        }

     });