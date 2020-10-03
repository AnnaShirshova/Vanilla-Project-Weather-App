// Date and time

let h6 = document.querySelector("h6");

var today = new Date();
let date = today.getDate();
let hours = today.getHours();
let minutes = today.getMinutes();
let year = today.getFullYear();
// let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// let day = days[today.getDay()];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[today.getMonth()];

h6.innerHTML = `${month} ${date}, ${hours}:${minutes}, ${year}`;

// Conversion C --> F

var isFahrenheit = false

function convertToFahrenheit(event) {
    if (isFahrenheit == true) {
        return;
    }
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature * 9 / 5) + 32);
    // forecastMax = Math.round(forecast.main.temp_max);
    // forecastMin = Math.round(forecast.main.temp_min);
    // forecastMax.innerHTML = Math.round((temperature * 9 / 5) + 32);
    // forecastMin.innerHTML = Math.round((temperature * 9 / 5) + 32);
    isFahrenheit = true;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);


// Conversion F --> C

function convertToCelcius(event) {
    if (!isFahrenheit) {
        return;
    }
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((5*temperature - 160)/9);
    isFahrenheit = false;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);


// Search engine + real life data + forecast

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let h1 = document.querySelector("h1");
    if (searchInput.value) {
        h1.innerHTML = `${searchInput.value}`
    } else {
        h1.innerHTML = null;
        alert("Please type a city");
    }

     let apiKey = "ae06093a9e8520231dc7244ee42ea23d";
     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;

     function showTemperature(response) {
     let temperature = Math.round(response.data.main.temp);
     let pressure = Math.round(response.data.main.pressure);
     let humidity = Math.round(response.data.main.humidity);
     let wind = Math.round(response.data.wind.speed);
     let icon = response.data.weather[0].icon;
     let description = response.data.weather[0].description;

     let h2 = document.querySelector("#temperature");
     h2.innerHTML = temperature; 
     h6 = document.querySelector("#description");
     h6.innerHTML = description;
     let hum = document.querySelector("#humidity");
     hum.innerHTML = `${humidity} %`;
     let windSpeed = document.querySelector("#wind");
     windSpeed.innerHTML = `${wind} km/h`;
     let press = document.querySelector("#pressure");
     press.innerHTML = `${pressure} Pa`;
     let iconElement = document.querySelector("#icon");
     iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);
     iconElement.setAttribute("alt", description);
    }

    function displayForecast(response) {

        function formatHours(timestamp) {
            date = new Date(timestamp);
            hours = date.getHours();
            if (hours < 10) {
                hours = `0${hours}`;
            }
            minutes = date.getMinutes();
            if (minutes <10) {
                minutes = `0${minutes}`;
            }
            return `${hours}:${minutes}`;
        }

        let forecast = null;
        for (let index = 0; index < 6; index++) {
            
            forecast = response.data.list[0];
            let forecastElement = document.querySelector("#forecast");
            forecastElement.innerHTML =
                `<div class="row">
                    <div class="col-6">
                        ${formatHours(forecast.dt * 1000)}
                    </div>
                    <div class="col-6" class="data">
                        <p>
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> 
                            | ${Math.round(forecast.main.temp_min)}°
                        </p>
                    </div>
                </div>`;

            forecast = response.data.list[1];
            forecastElement = document.querySelector("#forecast2");
            forecastElement.innerHTML =
                `<div class="row">
                    <div class="col-6">
                        ${formatHours(forecast.dt * 1000)}
                    </div>
                    <div class="col-6" class="data">
                        <p>
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> 
                            | ${Math.round(forecast.main.temp_min)}°
                        </p>
                    </div>
                </div>`;

            forecast = response.data.list[2];
            forecastElement = document.querySelector("#forecast3");
            forecastElement.innerHTML =
                `<div class="row">
                    <div class="col-6">
                        ${formatHours(forecast.dt * 1000)}
                    </div>
                    <div class="col-6" class="data">
                        <p>
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> 
                            | ${Math.round(forecast.main.temp_min)}°
                        </p>
                    </div>
                </div>`;

            forecast = response.data.list[3];
            forecastElement = document.querySelector("#forecast4");
            forecastElement.innerHTML =
                `<div class="row">
                    <div class="col-6">
                        ${formatHours(forecast.dt * 1000)}
                    </div>
                    <div class="col-6" class="data">
                        <p>
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> 
                            | ${Math.round(forecast.main.temp_min)}°
                        </p>
                    </div>
                </div>`;

            forecast = response.data.list[4];
            forecastElement = document.querySelector("#forecast5");
            forecastElement.innerHTML =
                `<div class="row">
                    <div class="col-6">
                        ${formatHours(forecast.dt * 1000)}
                    </div>
                    <div class="col-6" class="data">
                        <p>
                            <strong>${Math.round(forecast.main.temp_max)}°</strong> 
                            | ${Math.round(forecast.main.temp_min)}°
                        </p>
                    </div>
                </div>`;
        }
    }

    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&&units=metric`;

     axios.get(apiUrl).then(showTemperature);
     axios.get(forecastApiUrl).then(displayForecast);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);