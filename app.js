import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('images/rain.png'); // default icon

  const apiKey = '3e7fec0962ded283d25905fe14b74a8b';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

  const checkWeather = async () => {
    if (!city) return; // Prevent empty searches
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    
    setWeatherData(data);
    setWeatherIcon(getWeatherIcon(data.weather[0].main));
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clouds":
        return "images/clouds.png";
      case "Clear":
        return "images/clear.png";
      case "Rain":
        return "images/rain.png";
      case "Drizzle":
        return "images/drizzle.png";
      case "Mist":
        return "images/mist.png";
      default:
        return "images/rain.png";
    }
  };

  return (
    <div className="App">
      <div className="weather-heading">
        <h1>Weather now</h1>
      </div>

      <div className="card">
        <div className="search">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city name"
            spellCheck="false"
          />
          <button onClick={checkWeather}>
            <img src="images/search.png" alt="Search" />
          </button>
        </div>

        {weatherData && (
          <div className="weather">
            <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>

            <div className="Details">
              <div className="col">
                <img src="images/humidity.png" alt="Humidity" />
                <div>
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="images/wind.png" alt="Wind Speed" />
                <div>
                  <p className="wind">{weatherData.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
