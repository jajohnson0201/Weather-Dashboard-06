var tempInput = document.querySelector("#temp-input");
var windInput = document.querySelector("#wind-input");
var humidityInput = document.querySelector("#humidity-input");
var cityDate = document.querySelector("#city-date");
var chosenCitySection = document.querySelector("#chosen-city");
var searchedCity = document.querySelector("#city-name");
var presetButtons = document.querySelector("#preset-buttons")

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=10&lon=10&cnt=5&appid=b28f820e13155097eae3e6dfc028dc1c";

console.log(queryURL);

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?" +
    "q=" + cityName + "&limit=1&appid=b28f820e13155097eae3e6dfc028dc1c"

fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

presetCity(clicked){
    clicked.preventDefault();
    console.log(clicked)
}

presetButtons.addEventListener("click", function(event){
    var btnClicked = event.target;
    presetCity(btnClicked);
});