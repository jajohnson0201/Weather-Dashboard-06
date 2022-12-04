var tempInput = document.querySelector("#temp-input");
var windInput = document.querySelector("#wind-input");
var humidityInput = document.querySelector("#humidity-input");
var cityDate = document.querySelector("#city-date");
var chosenCitySection = document.querySelector("#chosen-city");
var searchText = document.querySelector("#city-name");
var searchButton = document.querySelector("#search-button")
var presetButtons = document.querySelector("#preset-buttons")
var currentIcon = document.querySelector("#current-icon");

var cityName = "";
var today = dayjs().format('DD/MM/YYYY');
console.log(today);

var weather = [];

// function to get data from typed city for 5 day forcast,
// and lat lon coordinates for current day function.
function searchedCity(typed) {
    console.log(typed);
    cityName = typed;

    chosenCitySection.classList.remove('hidden');
    var searchedCityUrl = "http://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + cityName + ",us&units=imperial&appid=b28f820e13155097eae3e6dfc028dc1c"
    fetch(searchedCityUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.city);
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;



            for (var i = 0; i < 5; i++) {
                weather.push(data.list[(i * 8)]);
                console.log(data.list[(i * 8)]);
                console.log(i);
            }
            var currentWeatherURL =
                "https://api.openweathermap.org/data/2.5/weather?" +
                "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b28f820e13155097eae3e6dfc028dc1c";
            fetchCurrent(currentWeatherURL);
        });
}

// gets current weather data from lat and lon given with 5 day forecast.
// adds current data to the weather obj
function fetchCurrent(current) {
    fetch(current)
        .then(function (resp) {
            //console.log(resp)
            return resp.json();
        }).then(function (dat) {
            console.log(dat)
            console.log(dat.main.temp);
            weather.push(dat);
            gotData();
        })
}

// function to display data with object made from both 5 day forcast,
// aslo displays current weather data
function gotData() {
    console.log(weather);
    cityDate.textContent = cityName + " " + today;
    currentIcon.src = "http://openweathermap.org/img/wn/" +
        weather[5].weather[0].icon + ".png"
    tempInput.textContent = weather[5].main.temp + " °F";
    windInput.textContent = weather[5].wind.speed + " MPH";
    humidityInput.textContent = weather[5].main.humidity + " %";
}

// function to get data from clicked option for 5 day forcast,
// and lat lon coordinates for current day function.
function presetCity(clicked) {
    console.log(clicked.textContent);
    cityName = clicked.textContent;
    chosenCitySection.classList.remove('hidden');
    var cityUrl = "http://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + cityName + "&limit=1&appid=b28f820e13155097eae3e6dfc028dc1c"

    fetch(cityUrl)
        .then(function (response) {
            // console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;

            for (var i = 0; i < 5; i++) {
                weather.push(data.list[(i * 8)]);
                console.log(data.list[(i * 8)]);
                console.log(i);
            }
            var currentWeatherURL =
                "https://api.openweathermap.org/data/2.5/weather?" +
                "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b28f820e13155097eae3e6dfc028dc1c";
            fetchCurrent(currentWeatherURL);
        });
}

// these 2 functions both store the last searched/clicked city in local storage
function storeLastPresetResult(text) {
    console.log(text.textContent);
    localStorage.setItem("prevResults", JSON.stringify(text.textContent));
}
function storeLastSearchedResult(text) {
    console.log(text);
    localStorage.setItem("prevResults", JSON.stringify(text));
}
function setLastResult (){
   var lastCity = JSON.parse(localStorage.getItem("prevResults"));
   searchedCity(lastCity);
}
setLastResult();
// event listener for the search results
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var typedCity = searchText.value;
    searchedCity(typedCity);
    storeLastSearchedResult(typedCity);
});

// event listener for the preset button options
presetButtons.addEventListener("click", function (event) {
    var btnClicked = event.target;
    presetCity(btnClicked);
    storeLastPresetResult(btnClicked);
});