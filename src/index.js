function cityLacking(err) {
  let citySearched = document.querySelector("#cityinput");
  if (err.code === "ERR_BAD_REQUEST") {
    alert(
      `Sorry, we don't know the weather for this city, try instead https://www.google.com/search?q=weather+${citySearched.value}`
    );
  }
}
function citySubmission(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#cityinput");

  function showTemperature(response) {
    console.log(response);
    temperatureCelsius = Math.round(response.data.main.temp);
    document.querySelector(
      "#placenow"
    ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    document.querySelector("#currentTemperature").innerHTML =
      temperatureCelsius;
    document.querySelector("#weatherText").innerHTML =
      response.data.weather[0].description;
    document.querySelector(
      "#humidity"
    ).innerHTML = `${response.data.main.humidity}% humidity`;
    document.querySelector("#windspeed").innerHTML = `windspeed of ${Math.round(
      response.data.wind.speed
    )}km/h`;
  }

  let appiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let city = citySearched.value;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUrl1 = `${apiEndpoint}?q=${city}&appid=${appiKey}&units=${units}`;
  axios.get(weatherUrl1).then(showTemperature);
  axios.get(weatherUrl1).then(showTemperature).catch(cityLacking);
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", citySubmission);

let button = document.querySelector("#magnifying");
button.addEventListener("click", citySubmission);

function showTemperature(response) {
  console.log(response);
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
}

function currentLocation(position) {
  let appiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let currentlatitude = position.coords.latitude;
  let currentlongitude = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let weatherUrl2 = `${apiEndpoint}?lat=${currentlatitude}&lon=${currentlongitude}&appid=${appiKey}&units=${units}`;
  axios.get(weatherUrl2).then(showTemperature);
}

function fetchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
navigator.geolocation.getCurrentPosition(currentLocation);

let buttonCurrentLocation = document.querySelector("#currentLocation");
buttonCurrentLocation.addEventListener("click", fetchCurrentLocation);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  let temperatureFahrenheit = Math.round((temperatureCelsius * 9) / 5 + 32);
  temperature.innerHTML = temperatureFahrenheit;
  document.querySelector("#currentTemperature").style.color = "#e8f308";
}

let fahrenheitLink = document.querySelector("#clickFahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = temperatureCelsius;
  document.querySelector("#currentTemperature").style.color = "#04f2de";
}

let celsiusLink = document.querySelector("#clickCelsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let temperatureCelsius = null;
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
h5.innerHTML = formatDate();
