const APIKey = "a575879ffdb6f532351ea0bb4a765aa7";

$(document).ready(function(){

    var cities = []

    function renderHistory() {
        $(".history").empty();
        var newSet = new Set(cities);
        var historyList = Array.from(newSet);
    
        for (i = 0; i < historyList.length; i++) {
            var history = historyList[i];
            localStorage.setItem(i, JSON.stringify(historyList[i]));
            var newCity = document.createElement("button");
            newCity.textContent = JSON.parse(localStorage.getItem(i));
            newCity.classList.add("list-group-item")
            newCity.classList.add("history-city")
            
            $(".history").prepend(newCity);
        }
    }
     
    $(document).on("click", ".history-city", function (event) {
        var city = $(this).html();
        cities.push(city)
        
        current();
    })
    
    $(document).ajaxError(function() {
        $(".temp").empty()
        $(".wind").empty()
        $(".humidity").empty()
        $(".icon").attr("src", "")
        $(".uv-index").empty()
        $(".forecast").empty()
        $(".city").html("<h3>" + "Please enter a valid city" + "</h3>").attr("style", "color: red;")
    })
    
    for (i=0; i < localStorage.length; i++) {
        cities.push(JSON.parse(localStorage.getItem(i)))
    }
    
    if (localStorage.length > 0) {
        renderHistory();
        current();
    }
    

    $("#search").on("click", function(event) {
        event.preventDefault();
        var cityInput= $("#city-input").val().trim();
        if(cityInput){
            cities.push(cityInput.charAt(0).toUpperCase + cityInput.slice(1));
        }
       
        $("#city-input").val("");

    current();
    renderHistory();
      });
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
});



