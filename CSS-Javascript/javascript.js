// Current date and time

function formatDate(currentDate) {
  let dayNumber = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDate.getMonth()];

  return `${day}, ${month} ${dayNumber} &nbsp;&nbsp; | &nbsp;&nbsp; ${hours}:${minutes}`;
}

let currentTime = new Date();
let dateNow = document.querySelector("#date-and-time");
dateNow.innerHTML = formatDate(currentTime);

//Geolocation (city name) &
//Bonus: Add a Current Location button. When clicking on it, it uses the
//Geolocation API to get your GPS coordinates and display and the city
//and current temperature using the OpenWeather API.
function showWeatherCondition(response) {
  let cityWeather = document.querySelector("#city");
  cityWeather.innerHTML = response.data.name;
  let temp = document.querySelector(".large-temp");
  temp.innerHTML = Math.round(response.data.main.temp);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //document.querySelector("#precipitation").innerHTML =
  //response.data.main.precipitation;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  //position.coords.latitude
  //position.coords.longitude
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector(".search-bar");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector(".current-button");
currentLocation.addEventListener("click", getCurrentLocation);

searchCity("New York");
