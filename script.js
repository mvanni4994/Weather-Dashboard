const APIKey = "a575879ffdb6f532351ea0bb4a765aa7";

$(document).ready(function(){

// need queryUV, queryForecast, queryCurrent

    function uvIndex(lat, lon){
        var uvAPIroute= "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
    
        // ajax call for uv
        return $.ajax({
            url: uvAPIroute,
            method: "GET"
        }) 

    };

    function forecast(userCity){
        var forecast= "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey
        // ajax call for forecast

        $.ajax({
            url:forecast,
            method: "GET"
        }).then(function(response){
            console.log(response)
        });
    };

    function currentWeather(cityName){
        var city= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey
        //  ajax call for current weather
        $.ajax({
            url:city,
            method: "GET"
        }).then(function(response){
            uvIndex(response.coord.lat, response.coord.lon)
            .then(function(index){
                var temp = Math.floor((response.main.temp - 273.15) * 9/5 + 32)
                document.querySelector("#weather-container").innerHTML += `<div class="card display" style="height: 55%;">
            <div class="card-body" id="city-info">
                <div><p class="city">${response.name}</p><img class="icon"></div>
                <div><p class="temp">Temp: ${temp} F</p></div>
                <div><p class="humidity">Humidity: ${response.main.humidity}</p></div>
                <div><p class="wind">Wind Speed: ${response.wind.speed} MPH</p></div>
                <div class="uv-index">UV: ${index.value}</div>
            </div>
        </div>`
            })
            console.log(response)
            return response
        });
    };

    $("#search").on("click", function(event) {
        event.preventDefault();
        var cityInput= $("#city-input").val().trim();
        currentWeather(cityInput);
      });
    });
