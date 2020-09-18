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

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = Math.round((temperature * 9 / 5) + 32); 
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);


// Conversion F --> C

function convertToCelcius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperature = Number(temperature);
    temperatureElement.innerHTML = null;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);


// Search engine + real life data

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

     let h2 = document.querySelector("#temperature");
     h2.innerHTML = temperature; 
     let hum = document.querySelector("#humidity");
     hum.innerHTML = `${humidity} %`;
     let windSpeed = document.querySelector("#wind");
     windSpeed.innerHTML = `${wind} km/h`;
     let press = document.querySelector("#pressure");
     press.innerHTML = `${pressure} Pa`;
    }

     axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);