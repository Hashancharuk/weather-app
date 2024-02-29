import React, { useState } from 'react';
import Navbar from './assests/components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [localtime, setLocalTime] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0c16464065c24b7cb5631308242902&q=${searchQuery}`);
      const data = await response.json();
      setTemperature(data.current.temp_c);
      setCity(data.location.name);
      setCondition(data.current.condition.text);
      setLocalTime(data.location.localtime);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <Navbar/>
    </div>
      <div>
        <h1>Weather Forecast</h1>
        <form>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter your city"
          />
          <button type="button" onClick={handleSearch}>Search</button>
        </form>
        <div>
          <p>Condition: {condition}</p>
          <p>Temperature: {temperature}°C</p>
          <p>Local Time: {localtime}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
