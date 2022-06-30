async function fetchAsync(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}




function makeRequest(requestType="forecast.json", zipCode="27519"){
    let apiKey = "?key=d98410f070754f77a40205826222603";
    let baseUrl = "http://api.weatherapi.com/v1";
    
    let requestUrl = baseUrl + "/" + requestType + apiKey + "&q=" + zipCode + "&days=7";

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
        item.getElementsByClassName("forcast-day-title")[0].innerHTML = weatherData["forecast"]["forecastday"][i]["date"]?.date
        item.getElementsByClassName("forcast-day-temps-div")[0].getElementsByClassName("forcast-day-high-temp-div")[0].innerHTML = weatherData["forecast"]["forecastday"][i]["day"]["max" + tempType] + tempAppendage
        item.getElementsByClassName("forcast-day-temps-div")[0].getElementsByClassName("forcast-day-low-temp-div")[0].innerHTML = weatherData["forecast"]["forecastday"][i]["day"]["min" + tempType] + tempAppendage
        i++;
    }
}

function setupForecastDay(htmlObject, title, image, high, low){
    htmlObject.getElementsByClassName("forcast-day-title")[0].innerHTML = title;
            htmlObject.getElementsByClassName("forcast-day-image-div")[0].children[0].src = "https:" + image;
            htmlObject.getElementsByClassName("forcast-day-high-temp-div")[0].innerHTML = high;
            htmlObject.getElementsByClassName("forcast-day-low-temp-div")[0].innerHTML = low;

}

function formatDate(date){
    let temp = new Date(date);
    return temp.toLocaleString(undefined, {weekday: "long"});
}

// main();

let data;

fetch(makeRequest())
    .then(response => response.json())
    .then((jsonData) => {
        weatherData = jsonData;

        console.log(weatherData)
        let currentData = weatherData["current"];
        let locData = weatherData["location"];

        let tempType = true ? "temp_f" : "temp_c";
        let tempAppendage =  true ? "℉" : "℃";

        let currentTemp = document.getElementsByClassName("temp-div")[0];
        let locName = document.getElementsByClassName("location-div")[0];
        let currentCondition = document.getElementsByClassName("description-div")[0];
        let currentWeatherImage = document.getElementsByClassName("weather-image")[0];
        let currentTimeStamp = document.getElementsByClassName("date-div")[0];

        currentTemp.innerHTML = currentData[tempType] + tempAppendage;
        locName.innerHTML = locData["name"] + ", " + locData["region"];
        currentCondition.innerHTML = currentData["condition"]["text"];
        currentWeatherImage.src = "https:" + currentData["condition"]["icon"];
    
        const options = {weekday: 'long', month: 'long', day: 'numeric'};
        currentTimeStamp.innerHTML =  new Date().toLocaleString(undefined, options);

        var days = document.getElementsByClassName("forcast-day-div");
        var forecastTitles = document.getElementsByClassName("forcast-day-title");

        console.log(weatherData.forecast.forecastday)
        // forecastTitles[0].innerHTML = weatherData.forecast.forecastday[1].date
        let i = 0;
        while(i < 3){

            let htmlObject = days[i];
            let title = formatDate(weatherData.forecast.forecastday[i].date);
            let image = weatherData.forecast.forecastday[i].day.condition.icon;
            let high = weatherData.forecast.forecastday[i].day["max" + tempType] + tempAppendage;
            let low = weatherData.forecast.forecastday[i].day["min" + tempType] + tempAppendage;
            
            setupForecastDay(htmlObject, title, image, high, low);
            i++;
        }

        let dataBlocks = document.getElementsByClassName("info-data-div");
        dataBlocks[0].innerHTML = currentData.wind_mph + " mph";
        dataBlocks[1].innerHTML = currentData.uv;
        dataBlocks[2].innerHTML = weatherData.forecast.forecastday[0].astro.sunset;
        dataBlocks[3].innerHTML = weatherData.forecast.forecastday[0].day.daily_chance_of_rain + "%";

    })
    // .catch((e) => console.log("Fetch Error: " + e));

