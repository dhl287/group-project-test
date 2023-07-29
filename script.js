// unique API key
var apiKey = "0aec531cfccd4364841446fc91ca9602";
var displayArea = document.getElementById ("main")
var main = $("main");
var form = $("#form");
var search = $("#search");
var city = "";

// `https://api.weatherbit.io/v2.0/alerts?city={City,StateAbreviation}&key=0aec531cfccd4364841446fc91ca9602`

// use API to get weather alerts by location, fetch request
function getAlertsByLocation() {
  fetch(
    `https://api.weatherbit.io/v2.0/alerts?city=${city}&key=0aec531cfccd4364841446fc91ca9602`
  )
    .then((resp) => resp.json())
    .then((respData) => {
      console.log(respData);
      addAlertsToPage(respData);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// add alerts to page, Rico will ask tutor about adding if/else statements for # of alerts
function addAlertsToPage(data) {
  var cityAlerts = document.createElement("div");
  cityAlerts.classList.add("weather");

  
 
  // No alerts
  if (data.alerts.length === 0) {
    displayArea.innerText = "No weather alerts for this city!";
  
  }
 
  // 1 or more alerts
  else {
    let displayMessage = "";
    data.alerts.forEach((alert) => {
      displayMessage += alert.title + "\n"; // assuming each alert is a string adjust as necessary
    });
    displayArea.innerText = displayMessage;
  }
  main.innerHTML = "";
  main.append(cityAlerts);
};

function getSearchedCity () {
  city = search.val();
  console.log(city);
  if (city) {
    getAlertsByLocation();
  }
}

// need to configure searchBtn and clearBtn
document
  .getElementById("searchBtn")
  .addEventListener("click", getSearchedCity);

// click enter, results show
form.on("submit", (event) => {
  console.log("SUBMIT");
  event.preventDefault();
getSearchedCity()
  
});

// need to add if/else statements
// if(${data.alerts[0].title} === 0) {
// cityAlerts.innerHTML = '
// <h4>${data.alerts[0].title}</h4>
// } else {

// }
