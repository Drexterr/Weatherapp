import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Droplet, 
  Thermometer, 
  Wind, 
  MapPin, 
  Search 
} from 'lucide-react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Mock weather data fetch (replace with actual API call)
  const fetchWeather = async () => {
    // Simulated weather data
    const mockWeatherData = {
      'New York': {
        temperature: 22,
        humidity: 65,
        windSpeed: 12,
        description: 'Partly Cloudy',
        icon: <CloudSun size={100} className="text-yellow-500" />
      },
      'London': {
        temperature: 15,
        humidity: 80,
        windSpeed: 8,
        description: 'Light Rain',
        icon: <CloudSun size={100} className="text-blue-400" />
      },
      'Tokyo': {
        temperature: 28,
        humidity: 70,
        windSpeed: 5,
        description: 'Sunny',
        icon: <CloudSun size={100} className="text-orange-500" />
      }
    };

    if (mockWeatherData[city]) {
      setWeather(mockWeatherData[city]);
      setError(null);
    } else {
      setError('City not found');
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex mb-6">
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
            <Search />
          </button>
        </form>

        {/* Weather Display */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        {weather && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {weather.icon}
            <h2 className="text-3xl font-bold text-white mb-2">{city}</h2>
            <p className="text-xl text-white mb-4">{weather.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex flex-col items-center">
                <Thermometer className="text-red-500" />
                <span className="text-white">{weather.temperature}°C</span>
                <p className="text-xs text-white">Temperature</p>
              </div>
              <div className="flex flex-col items-center">
                <Droplet className="text-blue-500" />
                <span className="text-white">{weather.humidity}%</span>
                <p className="text-xs text-white">Humidity</p>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="text-gray-500" />
                <span className="text-white">{weather.windSpeed} km/h</span>
                <p className="text-xs text-white">Wind Speed</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WeatherApp;