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
var today= dayjs().format('DD/MM/YYYY');
console.log(today);

var weather= [];

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
                weather.push(data.list[(i*8)]);
                console.log(data.list[(i * 8)]);
                console.log(i);
            }
            var currentWeatherURL =
            "https://api.openweathermap.org/data/2.5/weather?" +
            "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b28f820e13155097eae3e6dfc028dc1c";
            fetchCurrent(currentWeatherURL);
        });
    }
    
    //var curren =
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
    
    //console.log(curren);
    function gotData(){
        console.log(weather);
        cityDate.textContent = cityName +" "+ today ;
        currentIcon.src= "http://openweathermap.org/img/wn/"+ 
            weather[5].weather[0].icon + ".png"
        tempInput.textContent=weather[5].main.temp+ " °F";
        windInput.textContent=weather[5].wind.speed+ " MPH";
        humidityInput.textContent=weather[5].main.humidity+ " %";
    }

// fetchCurrent(currentWeatherURL);
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
            cityDate.textContent = cityName +" "+ today;
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;

            for (var i = 0; i < 5; i++) {
                weather.push(data.list[(i*8)]);
                console.log(data.list[(i * 8)]);
                console.log(i);
            }
            var currentWeatherURL =
                "https://api.openweathermap.org/data/2.5/weather?" +
                "lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b28f820e13155097eae3e6dfc028dc1c";
            fetchCurrent(currentWeatherURL);
        });
}


searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    var typedCity = searchText.value;
    //console.log(typedCity);
    searchedCity(typedCity);
});

presetButtons.addEventListener("click", function (event) {
    var btnClicked = event.target;
    presetCity(btnClicked);
});