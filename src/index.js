import './styles.css';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

const API_KEY = 'FB4S6A3Y95FH2AL9PPK6QLZZ7';

async function getWeatherData() {
    const city = cityInput.value.trim();
    
    if (!city) {
        weatherInfo.innerHTML = '<p>Please enter a city name</p>';
        return;
    }
    
    weatherInfo.innerHTML = '<p>Loading weather data...</p>';
    
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const currentWeather = {
            city: data.address,
            country: data.resolvedAddress ? data.resolvedAddress.split(',')[1].trim() : 'Unknown',
            temperature: `${data.currentConditions.temp}°C`,
            condition: data.currentConditions.conditions,
        };

        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h2>Weather in ${currentWeather.city}, ${currentWeather.country}</h2>
                <div class="weather-details">
                    <p>Temperature: ${currentWeather.temperature}</p>
                    <p>Condition: ${currentWeather.condition}</p>
                </div>
            </div>
        `;
        
    } catch (error) {
        weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
}

searchButton.addEventListener('click', getWeatherData);