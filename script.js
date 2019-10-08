document.getElementById("cityField").addEventListener("keyup", function(event) {
    event.preventDefault();
    document.getElementById("suggestions").innerHTML = document.getElementById("cityField").value;
    const url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" +
        document.getElementById("cityField").value;
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            var everything;
            everything = "<ul>";
            for (let i = 0; i < json.length; i++) {

                everything += "<li id=result> " + json[i].city;
            };


            everything += "</ul>";
            document.getElementById("suggestions").innerHTML = everything;
        });
});

document.getElementById("weatherButton").addEventListener("click", function(event) {
    event.preventDefault();
    var cityWeather = document.getElementById("result").textContent;
    if (cityWeather === "")
        return;
    console.log(cityWeather);
    
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityWeather + ",US&units=imperial" + "&APPID=96b97ea14e90ee24e455054e755cb87f";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            let results = "";
            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i !== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";
            document.getElementById("weatherResults").innerHTML = results;
        });
        
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityWeather + ", US&units=imperial" + "&APPID=96b97ea14e90ee24e455054e755cb87f";
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            let forecast = "";
            for (let i = 0; i < json.list.length; i++) {
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        });
});
