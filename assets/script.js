var tempInput = document.querySelector("#temp-input");
var windInput = document.querySelector("#wind-input");
var humidityInput = document.querySelector("#humidity-input");
var cityDate = document.querySelector("#city-date");
var chosenCitySection = document.querySelector("#chosen-city");
var searchText = document.querySelector("#city-name");
var searchButton = document.querySelector("#search-button")
var presetButtons = document.querySelector("#preset-buttons")
var currentIcon = document.querySelector("#current-icon");
var preButtons = document.querySelector(".pre-button")

var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");

var days= [
    day1,
    day2,
    day3,
    day4,
    day5,
]
console.log(days);

var cityName = "";
var today = dayjs().format('DD/MM/YYYY');
console.log(today);

var weather = [];

// function to get data from typed city for 5 day forcast,
// and lat lon coordinates for current day function.
function searchedCity(typed) {
    console.log(typed);
    cityName = typed;
    weather = [];
    chosenCitySection.classList.remove('hidden');
    var searchedCityUrl = "https://api.openweathermap.org/data/2.5/forecast?" +
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

// clears the 5day forcast 
function clearForecast() {
    day1.innerHTML = ''
    day2.innerHTML = ''
    day3.innerHTML = ''
    day4.innerHTML = ''
    day5.innerHTML = ''
}

// function to display data with object made from both 5 day forcast,
// aslo displays current weather data
function gotData() {
    console.log(weather);
    cityDate.textContent = weather[5].name + " " + today;
    currentIcon.src = "https://openweathermap.org/img/wn/" +
        weather[5].weather[0].icon + "@2x.png"
    tempInput.textContent = weather[5].main.temp + " °F";
    windInput.textContent = "Wind: "+ weather[5].wind.speed + " MPH";
    humidityInput.textContent = "Humidity: "+ weather[5].main.humidity + " %";
    
    for(i=0;i<5;i++){
        var dateTime = document.createElement("h3");
        var icon = document.createElement("img");
        var temp = document.createElement("h4");
        var wind = document.createElement("h4");
        var humidity = document.createElement("h4");
        dateTime.textContent=weather[i].dt_txt;
        icon.src= "https://openweathermap.org/img/wn/" +
            weather[i].weather[0].icon + ".png";
            var date = dateTime.textContent.split(" ");
            dateTime.textContent=date[0];
        temp.textContent=weather[i].main.temp + " °F";
        wind.textContent=weather[i].wind.speed + " MPH";
        humidity.textContent="Humidity: "+ weather[i].main.humidity + " %";
        days[i].appendChild(dateTime);
        days[i].appendChild(icon);
        days[i].appendChild(temp);
        days[i].appendChild(wind);
        days[i].appendChild(humidity);
    }

}

// function to get data from clicked option for 5 day forcast,
// and lat lon coordinates for current day function.
function presetCity(clicked) {
    console.log(clicked.textContent);
    cityName = clicked.textContent;
    weather = [];
    chosenCitySection.classList.remove('hidden');
    var cityUrl = "https://api.openweathermap.org/data/2.5/forecast?" +
        "q=" + cityName + "&units=imperial&limit=1&appid=b28f820e13155097eae3e6dfc028dc1c"

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
var localArray=[];
// these 2 functions both store the last searched/clicked city in local storage
function storeLastPresetResult(text) {
    console.log(text.textContent);
    localArray.push(text.textContent);
    localStorage.setItem("prevResults", JSON.stringify(localArray));
}
function storeLastSearchedResult(text) {
    console.log(text);
    localArray.push(text);
    localStorage.setItem("prevResults", JSON.stringify(localArray));
} 

// gets last city from local storage and sets its data on the page
function setLastResult (){
   var lastCity = JSON.parse(localStorage.getItem("prevResults"));
   console.log(lastCity);
   if (lastCity !== null){
       searchedCity(lastCity.slice(-1));
   }
   else{
    return;
   }
}
setLastResult();

// event listener for the search results
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var typedCity = searchText.value;
    clearForecast();
    searchedCity(typedCity);
    storeLastSearchedResult(typedCity);
});

// event listener for the preset button options
presetButtons.addEventListener("click", function (event) {
    var btnClicked = event.target;
    clearForecast();
    presetCity(btnClicked);
    storeLastPresetResult(btnClicked);
});