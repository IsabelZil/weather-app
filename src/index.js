function cityLacking(err) {
  let citySearched = document.querySelector("#cityinput");
  if (err.code === "ERR_BAD_REQUEST") {
    alert(
      `Sorry, we don't know the weather for this city, click OK and try ${(window.location.href = `https://www.google.com/search?q=weather+${citySearched.value}`)}`
    );
  }
}
function citySubmission(event) {
  event.preventDefault();
  let citySearched = document.querySelector("#cityinput");

  function showTemperature(response) {
    console.log(response);
    document.querySelector(
      "#placenow"
    ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    document.querySelector("#currentTemperature").innerHTML = `${Math.round(
      response.data.main.temp
    )}º`;
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
  let country = response.data.sys.country;
  let city = response.data.name;
  document.querySelector(
    "#placenow"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#currentTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}º`;
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

function toFahr() {
  let temperature = document.querySelector("#temperatures2");
  temperature.innerHTML = "<strong>68º</strong>";
}
let fahrClick = document.querySelector("#fahr-click");
fahrClick.addEventListener("click", toFahr);

function toCelsius() {
  let temperature = document.querySelector("#currentTemperature");
  temperature.innerHTML = "<strong>20º</strong>";
}
let celsiusClick = document.querySelector("#celsius-click");
celsiusClick.addEventListener("click", toCelsius);