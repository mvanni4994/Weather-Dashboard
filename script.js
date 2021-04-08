const APIKey = "a575879ffdb6f532351ea0bb4a765aa7";

$(document).ready(function(){


   
   
// need queryUV, queryForecast, queryCurrent

    function uvIndex(lat, lon){
        var uvAPIroute= "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey
    
        // ajax call for uv
        $.ajax({
            url: uvAPIroute,
            method: "GET"
        }) .then(function(response){
            console.log(response)
        })
    }

    function forecast(userCity){
        var forecast= "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey
        // ajax call for forecast

        $.ajax({
            url:forecast,
            method: "GET"
        }) .then(function(response){

        })
    }

    function current(cityName){
        var city= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey
        //  ajax call for current weather
        $.ajax({
            url:city,
            method: "GET"
        }).then(function(response){

        });
    };

    $("#search").on("click", function(event) {
        event.preventDefault();
        var cityInput= $("#city-input").val().trim();
        current(cityInput)
        console.log(cityInput)
      });
});



