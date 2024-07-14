const weatherData = {
  "New York": { temp: 25, condition: "Sunny" },
  London: { temp: 18, condition: "Cloudy" },
  Tokyo: { temp: 30, condition: "Hot" },
  Sydney: { temp: 22, condition: "Rainy" },
};

document.addEventListener("DOMContentLoaded", (event) => {
  loadCities();
});

function addCity() {
  const cityInput = document.getElementById("cityInput").value.trim();
  if (cityInput === "") return;

  const cities = getCitiesFromLocalStorage();
  if (!cities.includes(cityInput)) {
    cities.push(cityInput);
    localStorage.setItem("cities", JSON.stringify(cities));
    displayCity(cityInput);
  }

  document.getElementById("cityInput").value = "";
}

function loadCities() {
  const cities = getCitiesFromLocalStorage();
  cities.forEach((city) => {
    displayCity(city);
  });
}

function getCitiesFromLocalStorage() {
  const cities = localStorage.getItem("cities");
  return cities ? JSON.parse(cities) : [];
}

function displayCity(city) {
  const cityData = weatherData[city] || { temp: "N/A", condition: "N/A" };
  const cityCard = document.createElement("div");
  cityCard.className = "city-card";
  cityCard.innerHTML = `
        <h3>${city}</h3>
        <p>Temperature: ${cityData.temp}°C</p>
        <p>Condition: ${cityData.condition}</p>
        <button class="remove-btn" onclick="removeCity('${city}')">Remove</button>
    `;
  document.getElementById("cities").appendChild(cityCard);
}

function removeCity(city) {
  let cities = getCitiesFromLocalStorage();
  cities = cities.filter((item) => item !== city);
  localStorage.setItem("cities", JSON.stringify(cities));
  document.getElementById("cities").innerHTML = "";
  loadCities();
}
