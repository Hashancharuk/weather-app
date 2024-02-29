import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import Navbar from './assests/components/navBar';
import image from './assests/w.jpg'
import './App.css';

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
      <Navbar />
      <img src={image} alt="Weather" className="custom-image" />
      <div className="container col-8">
        <h1>Weather Forecast</h1>
        <form className="row g-3">
          <div className="col-auto">
            <label htmlFor="city" className="visually-hidden">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your city"
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <p>Condition: {condition}</p>
            <p>Temperature: {temperature}°C</p>
            <p>Local Time: {localtime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
