var tempInput = document.querySelector("#temp-input");
var windInput = document.querySelector("#wind-input");
var humidityInput = document.querySelector("#humidity-input");
var cityDate = document.querySelector("#city-date");
var chosenCitySection = document.querySelector("#chosen-city");
var searchText = document.querySelector("#city-name");
var searchButton = document.querySelector("#search-button")
var presetButtons = document.querySelector("#preset-buttons")
var cityName = "";
tempInput="";
windInput="";
humidityInput="";
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=10&lon=10&cnt=5&appid=b28f820e13155097eae3e6dfc028dc1c";
// console.log(queryURL);

// fetch(queryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });

    function searchedCity(typed){
        console.log(typed);
        cityName = typed;
        chosenCitySection.classList.remove('hidden');
        var searchedCityUrl = "http://api.openweathermap.org/data/2.5/forecast?" +
            "q=" + cityName + ",us&appid=b28f820e13155097eae3e6dfc028dc1c"
        
        fetch(searchedCityUrl)
            .then(function (response) {
               // console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                console.log(data.city);
                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                
                cityDate.textContent= cityName;
                

                for(var i = 0; i < 4; i ++){
                    
                    console.log(data.list[(i*8)]);
                console.log(i);
                }
                var currentWeatherURL = 
                "https://api.openweathermap.org/data/2.5/weather?"+
                "lat="+lat+"&lon="+lon+"&appid=b28f820e13155097eae3e6dfc028dc1c";
                function fetchCurrent(current){
                    
                fetch(current)
                    .then(function (resp) {
                         //console.log(resp)
                         return resp.json();
                     }) .then(function (dat){
                        console.log(dat)
                        console.log(dat.main.temp);
                        tempInput.textContent= dat.main.temp;
                        windInput.textContent= dat.wind.speed;
                        humidityInput.textContent= dat.main.humidity;
                    })
                    }
                fetchCurrent(currentWeatherURL);
                    
            });
    }

    
    function presetCity(clicked){
        console.log(clicked.textContent);
        cityName = clicked.textContent;
        
        var cityUrl = "http://api.openweathermap.org/data/2.5/forecast?" +
            "q=" + cityName + "&limit=1&appid=b28f820e13155097eae3e6dfc028dc1c"
        
        fetch(cityUrl)
            .then(function (response) {
               // console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
    }

searchButton.addEventListener("click", function(event){
    event.preventDefault();
    var typedCity = searchText.value;
    console.log(typedCity);
    searchedCity(typedCity);
});

presetButtons.addEventListener("click", function(event){
    var btnClicked = event.target;
    presetCity(btnClicked);
});