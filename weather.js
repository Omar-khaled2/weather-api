const apiKey = "8c7b7e9cdfd14882a01153922242812";

async function fetchWeather(city) {


  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
  );
  
  const data = await response.json();
  updateCurrentWeather(data);
  updateForecast(data.forecast.forecastday);

}

function updateCurrentWeather(data) {
  document.getElementById("cityName").textContent = `${data.location.name}, ${data.location.country}`;
  document.getElementById("date").textContent = new Date(data.location.localtime).toDateString();
  document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
  document.getElementById("condition").textContent = data.current.condition.text;
  document.getElementById("weatherCondition").innerHTML = `<img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />`;
  document.getElementById("windSpeed").textContent = data.current.wind_kph;
  document.getElementById("humidity").textContent = data.current.humidity;
}

function updateForecast(forecastDays) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = ""; 

  forecastDays.forEach((day) => {
    const card = `
      <div class="col">
        <div class="card bg-dark text-white h-100 text-center">
          <div class="card-body">
            <p class="card-title">${new Date(day.date).toDateString()}</p>
            <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="weather-icon" />
            <p class="h5">${day.day.avgtemp_c}°C</p>
            <p class="card-text">${day.day.condition.text}</p>
            <p>💧 ${day.day.daily_chance_of_rain}%</p>
          </div>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += card;
  });
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = event.target.querySelector("input").value;
  if (city) {
    fetchWeather(city);
  }
});

fetchWeather("Giza");



