function citySubmission(event) {
  city = document.querySelector("#cityinput").value;
  event.preventDefault();
  searchCity(city);
}

function cityLacking(err) {
  city = document.querySelector("#cityinput").value;
  if (err.code === "ERR_BAD_REQUEST") {
    alert(
      `Enter another city name or try instead https://www.google.com/search?q=weather+${city}`
    );
  }
}
function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDayForecast(timeForecast) {
  let date = new Date(timeForecast * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<ul class="day">`;
  forecast.forEach(function (forecastDay, dayn) {
    if (dayn < 5) {
      forecastHTML =
        forecastHTML +
        ` <ul class="day">
  <li class="weekday">${formatDayForecast(forecastDay.dt)}</li>
  <li class="tempweekday">
    <span class="temperatureMax">${Math.round(forecastDay.temp.max)}ºC</span>|
    <span class="temperatureMin">${Math.round(forecastDay.temp.min)}ºC</span>
  </li>
  <li>
    <i class="fa-solid fa-cloud-sun emojis"></i>
  </li> </ul>`;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  temperatureCelsius = Math.round(response.data.main.temp);
  document.querySelector(
    "#placenow"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#currentTemperature").innerHTML = temperatureCelsius;
  document.querySelector("#weatherText").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}% humidity`;
  document.querySelector("#windspeed").innerHTML = `windspeed of ${Math.round(
    response.data.wind.speed
  )}km/h`;
  let iconElement = document.querySelector("#iconday");
  if (response.data.weather[0].icon === "01d") {
    iconElement.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  }
  if (response.data.weather[0].icon === "01n") {
    iconElement.innerHTML = `<i class="fa-solid fa-moon emoji"></i>`;
  }
  if (response.data.weather[0].icon === "02d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun emoji"></i>`;
  }
  if (response.data.weather[0].icon === "02n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-moon emoji"></i>`;
  }
  if (response.data.weather[0].icon === "03d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun emoji"></i>`;
  }
  if (response.data.weather[0].icon === "03n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-moon emoji"></i>`;
  }
  if (response.data.weather[0].icon === "04d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  }
  if (response.data.weather[0].icon === "09d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
  }
  if (response.data.weather[0].icon === "09n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-moon-rain"></i>`;
  }
  if (response.data.weather[0].icon === "10d") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  }
  if (response.data.weather[0].icon === "10n") {
    iconElement.innerHTML = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  }
  if (response.data.weather[0].icon === "11d") {
    iconElement.innerHTML = `<i class="fa-solid fa-bolt-lightning"></i>`;
  }
  if (response.data.weather[0].icon === "11n") {
    iconElement.innerHTML = `<i class="fa-solid fa-bolt-lightning"></i>`;
  }
  if (response.data.weather[0].icon === "13d") {
    iconElement.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].icon === "13n") {
    iconElement.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (response.data.weather[0].icon === "50d") {
    iconElement.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  }
  if (response.data.weather[0].icon === "50n") {
    iconElement.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  }
  getForecast(response.data.coord);
}

function searchCity(city) {
  let appiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUrl1 = `${apiEndpoint}?q=${city}&appid=${appiKey}&units=${units}`;
  axios.get(weatherUrl1).then(showTemperature);
  axios.get(weatherUrl1).then(showTemperature).catch(cityLacking);
}

function currentLocation(position) {
  let appiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let currentlatitude = position.coords.latitude;
  let currentlongitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUrl2 = `${apiEndpoint}?lat=${currentlatitude}&lon=${currentlongitude}&appid=${appiKey}&units=${units}`;
  axios.get(weatherUrl2).then(showTemperature);
  axios.get(weatherUrl2).then(showTemperature).catch(searchCity);
}

function fetchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  let temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5 + 32);
  temperature.innerHTML = temperatureFahrenheit;
  document.querySelector("#currentTemperature").style.color = "#e8f308";
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = temperatureCelsius;
  document.querySelector("#currentTemperature").style.color = "#04f2de";
}

function formatDate() {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let weeksday = week[now.getDay()];
  let monthofyear = month[now.getMonth()];
  let day = now.getDate();
  let date = `${weeksday}, ${monthofyear} ${day}`;
  return date;
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", citySubmission);

let button = document.querySelector("#magnifying");
button.addEventListener("click", citySubmission);

let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", fetchCurrentLocation);

let fahrenheitLink = document.querySelector("#clickFahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#clickCelsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function formatDate() {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let weeksday = week[now.getDay()];
  let monthofyear = month[now.getMonth()];
  let day = now.getDate();
  let date = `${weeksday}, ${monthofyear} ${day}`;
  return date;
}

let h5 = document.querySelector("#weekDayMonth");
let temperatureCelsius = null;
h5.innerHTML = formatDate();

let city = document.querySelector("#cityinput").value;
navigator.geolocation.getCurrentPosition(currentLocation);
