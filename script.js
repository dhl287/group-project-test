// unique API key
var apiKey = "3a081812dd82486ab2485127d4ec4566";
var displayArea = document.getElementById ("main")
var main = $("main");
var form = $("#form");
var search = $("#search");
var searchBtn = $('#searchBtn');
var clearBtn = $('#clearBtn');
var city = "";

// use API to get weather alerts by location, fetch request
function getAlertsByLocation() {
  fetch(`https://api.weatherbit.io/v2.0/alerts?city=${city}&key=3a081812dd82486ab2485127d4ec4566`)
    .then((resp) => resp.json())
    .then((respData) => {
      console.log(respData);
      addAlertsToPage(respData);
    })
      .catch((error) => {
        console.error("Error occurred:", error);
    });
}

// add alerts to page, if/else statements for # of alerts added
function addAlertsToPage(data) {
  var cityAlerts = document.createElement("div");
  cityAlerts.classList.add("alerts-class");

  // play sound
  document.getElementById("song").play()
 
  // No alerts
  if (data.alerts.length === 0) {
    console.log("nothing");
    displayArea.innerText = "No weather alerts for this city!";
  }
 
  // 1 or more alerts
  else {
    let displayMessage = "";
    data.alerts.forEach((alert) => {
      console.log("alert");
      displayMessage += alert.title + "\n"; // assuming each alert is a string adjust as necessary
      checkTitle(alert.title)
    });
    displayArea.innerText = displayMessage;
  }
  main.innerHTML = "";
  main.append(cityAlerts);
};

// Function to reset all image sources to a default image
function resetImages() {
  const defaultImg = "https://static.wikia.nocookie.net/crazymonsters/images/f/ff/Poke_ball.png/revision/latest/thumbnail/width/360/height/360?cb=20170530151725"; 
  const imageIds = ["heat-door", "water-door", "wind-door", "ice-door", "thunder-door"];
  imageIds.forEach(id => {
    document.getElementById(id).src = defaultImg;
  });
}

// Function to choose which pokemon to show based on type of alert
function checkTitle(title) {
  const data = [
    {
      keywords: ["heat", "fire"],
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      id: "heat-door"
    },
    {
      keywords: ["rain", "water", "flood", "surf", "beach", "tide"],
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
      id: "water-door"
    },
    {
      keywords: ["wind", "air"],
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
      id: "wind-door"
    },
    {
      keywords: ["cold", "ice", "freeze", "snow", "blizzard"],
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
      id: "ice-door"
    },
    {
      keywords: ["thunder", "lightning"],
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
      id: "thunder-door"
    }
  ];

  resetImages(); // Reset all images to default before checking the title

  data.forEach(item => {
      let trigger = false;

      item.keywords.forEach(keyword => {
        if(title.toLowerCase().includes(keyword)) {
          trigger = true;
        }
      })

      if(trigger) {
        document.getElementById(item.id).src = item.img
      }
  })
}

// search button
$("#searchBtn").on('click', function(event) {
  event.preventDefault();
  getSearchedCity();
});

// press enter to search
form.on('submit',(event) =>{
  console.log("SUBMIT")
  event.preventDefault();
  getSearchedCity();
});

// search city, get alerts by city name
function getSearchedCity () {
  city = search.val();
  console.log(city);
  if (city) {
    getAlertsByLocation();
  }
}

// clear button
$("#clearBtn").on('click', function(event) {
  event.preventDefault();
  clearResults();
});

// clearResults function to add to clear button
function clearResults () {
  displayArea.innerText = "";
  addToSearchHistory();
}

// get the search history from local storage if available
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// add a search term to the history
function addToSearchHistory() {
  var searchTerm = search.val().trim();

  if (searchTerm !== '') {
    // add the search term to the history
    searchHistory.push(searchTerm);

    // update the local storage with the updated search history
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    // clear the search input field
    search.val('');

    // refresh the displayed search history
    displaySearchHistory();
  }
}

// display the search history on the page
function displaySearchHistory() {
  var searchHistoryList = $('#searchHistoryList');

  // clear the existing list
  searchHistoryList.empty();

  // create starting index to display the search history, only show 5 items
  let startIndex = Math.max(0, searchHistory.length - 5);

  // iterate through the search history and create list items (up to 5 items)
  for (let i = startIndex; i < searchHistory.length; i++) {
    var searchTerm = searchHistory[i];
    var listItem = $('<li class="text-base hover:text-blue-500"></li>').text(searchTerm);
    searchHistoryList.append(listItem);
  };
}

// click event listener to search history list items
function handleHistoryItemClick() {
  $('#searchHistoryList').on('click', 'li', function() {
    var clickedSearchTerm = $(this).text();
    // Call getCurrentWeather() with the clicked search term
    getResultsWithSearchTerm(clickedSearchTerm);
  });
}

function getResultsWithSearchTerm(searchTerm) {
  city = searchTerm;
  getAlertsByLocation();
}

displaySearchHistory();
handleHistoryItemClick();
