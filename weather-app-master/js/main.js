async function fetchAsync(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}




function makeRequest(requestType="forecast.json", zipCode="27519"){
    let apiKey = "?key=d98410f070754f77a40205826222603";
    let baseUrl = "http://api.weatherapi.com/v1";
    
    let requestUrl = baseUrl + "/" + requestType + apiKey + "&q=" + zipCode + "&days=1";

    return requestUrl;
}

function setup(weatherData){
    console.log(weatherData);

    let currentData = weatherData["current"];
    let locData = weatherData["location"];
    let forecastData = weatherData["forecast"]["forecastday"];

    let tempType = true ? "temp_f" : "temp_c";
    let tempAppendage =  true ? "℉" : "℃";

    let currentTemp = document.getElementsByClassName("temp-div")[0]
    let locName = document.getElementsByClassName("location-div")[0]


    currentTemp.innerHTML = currentData[tempType] + tempAppendage;
    locName.innerHTML = 
        locData["name"] + ", " + locData["region"];

    var days = document.getElementsByClassName("forcast-day-div");

    console.log(days[0]);

    let i = 0;
    while(i < days.length){
        item = days[0];
        console.log(forecastData[i]?.date)
        item.getElementsByClassName("forcast-day-title")[0].innerHTML = forecastData[i]?.date;
        // item.getElementsByClassName("forcast-day-image-div")[0].innerHTML = forecastData[i]["date"]
        item.getElementsByClassName("forcast-day-temps-div")[0].getElementsByClassName("forcast-day-high-temp-div")[0].innerHTML = forecastData[i]["day"]["max" + tempType] + tempAppendage
        item.getElementsByClassName("forcast-day-temps-div")[0].getElementsByClassName("forcast-day-low-temp-div")[0].innerHTML = forecastData[i]["day"]["min" + tempType] + tempAppendage
        i++;
    }
}

// main();

fetch(makeRequest())
    .then(response => response.json())
    .then(data => {
        setup(data);
    });