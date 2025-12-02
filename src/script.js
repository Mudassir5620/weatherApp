// Selecting elements
console.log("hey i am mudassir ");
const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("cityName");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const desc = document.querySelector(".description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const day = document.querySelector(".day");
const dateText = document.querySelector(".date");
const weatherIcon = document.querySelector(".weather-icon");

// date & day update
function updateDateTime() {
    let d = new Date();
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    day.innerHTML = days[d.getDay()];

    let dd = d.getDate().toString().padStart(2, '0');
    let mm = (d.getMonth() + 1).toString().padStart(2, '0');
    let yyyy = d.getFullYear();

    dateText.innerHTML = `${dd}-${mm}-${yyyy}`;
}
updateDateTime();


// Weather search function
async function getWeather(cityName) {
    try {
        let apiKey = "e7b8110a80c9530fe3d8f12cd6957ba1";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric`;

        city.innerHTML = "Loading...";

        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            city.innerHTML = "Not Found";
            return;
        }

        // Update UI
        city.innerHTML = data.name;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        desc.innerHTML = data.weather[0].description;
        wind.innerHTML = data.wind.speed + " km/h";
        humidity.innerHTML = data.main.humidity + "%";

        let condition = data.weather[0].main.toLowerCase();

        if (condition.includes("rain")) {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if (condition.includes("cloud")) {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        } else if (condition.includes("clear")) {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/169/169367.png";
        } else {
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1779/1779940.png";
        }

    } catch (error) {
        console.log(error);
        alert("Something went wrong! Please try again.");
    }
}

// Button
searchBtn.addEventListener("click", () => {
    let cityName = input.value.trim();
    if (cityName) getWeather(cityName);
});

// Enter key
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") getWeather(input.value.trim());
});
