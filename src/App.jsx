import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CloudSun,
  Droplet,
  Thermometer,
  Wind,
  Search as SearchIcon
} from 'lucide-react';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const Weather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      
      
      setWeatherData({
        city: data.name,
        temp: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: data.weather[0].icon,
        desc: data.weather[0].main,
        country: data.sys.country
      });
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setWeatherData(null);
    }
  }

  /* useEffect(() => {
    Weather("Delhi")
  }, []); */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      Weather(city);
    }
  }

  return (
    <div className='bg-gradient-to-br from-sky-400 to-purple-600'>
      <h1 className='flex justify-center text-6xl pt-10 font-bold text-white'>Weather App</h1>
    <div className="min-h-screen  flex items-center justify-center p-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="flex mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow p-3 rounded-l-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <SearchIcon />
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} 
              alt={weatherData.desc} 
              className="mx-auto"
            />
            <h2 className="text-3xl font-bold text-white mb-2">{weatherData.city}, {weatherData.country}</h2>
            <p className="text-xl text-white mb-4">{weatherData.desc}</p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <Thermometer className="text-red-500" />
                <span className="text-white">{weatherData.temp}°C</span>
                <p className="text-xs text-white">Temperature</p>
              </div>
              <div className="flex flex-col items-center">
                <Droplet className="text-blue-500" />
                <span className="text-white">{weatherData.humidity}%</span>
                <p className="text-xs text-white">Humidity</p>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="text-gray-500" />
                <span className="text-white">{weatherData.wind} km/h</span>
                <p className="text-xs text-white">Wind Speed</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
    </div>
  );
};

export default App;