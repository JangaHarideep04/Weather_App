const apiKey = "50792702807335ac3bc2d067a6544522";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    let data;  // Declare data globally
    const searchbox = document.querySelector(".search input");
    const searchbtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const weatherElement = document.querySelector(".weather");

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            data = await response.json();
            // console.log(data);

            // Update the DOM elements with weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update the weather icon based on conditions
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "./clouds.jpg";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "./clearsky.jpg";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "./dizzle.webp";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "./rain.png";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "./snow.webp";
            }

            // Display the weather information only if the element is found
            if (weatherElement) {
                weatherElement.style.display = "block";
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Display the weather information upon loading
    window.onload = function () {
        const city = "New York"; // Provide a default city
        checkWeather(city);
    };

    // Search button event listener
    searchbtn.addEventListener("click", () => {
        checkWeather(searchbox.value);
    });