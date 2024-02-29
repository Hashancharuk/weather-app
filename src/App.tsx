import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './assests/components/navBar';
import image from './assests/w.jpg';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [condition, setCondition] = useState("");
  const [localtime, setLocalTime] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeeed] = useState("");
  const [region, setRegion] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0c16464065c24b7cb5631308242902&q=${searchQuery}`);
      const data = await response.json();
      setTemperature(data.current.temp_c);
      setCity(data.location.name);
      setCondition(data.current.condition.text);
      setLocalTime(data.location.localtime);
      setName(data.location.name);
      setIcon(data.current.condition.icon);
      setHumidity(data.current.humidity);
      setWindSpeeed(data.current.wind_kph);
      setRegion(data.location.region);

    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="custom-image-container">
        <h1 className='mainTopic'>Weather Forecast</h1>
        <img src={image} alt="Weather" className="custom-image" />
        <div className="form-container">
          <form className="row g-3">
            <div className="col-auto">
              <label htmlFor="city" className="visually-hidden">City</label>
              <input type="text" className="insert-city" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter your city" />
            </div>
            <div className="col-auto">
              <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="card" style={{ width: '20rem' }}>
            <div className="row">
              <div className="col">
                <p>{name}</p>
                <p><img src={icon} className='weatherImage' /></p>
                <p> {condition}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-7">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Local Time</th>
                <th scope="col">Temperature(°C)</th>
                <th scope="col">Humidity</th>
                <th scope="col">Wind Speed(Kph)</th>
                <th scope="col">Condition</th>
                <th scope="col">Region</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{localtime}</th>
                <td>{temperature}</td>
                <td>{humidity}</td>
                <td>{windSpeed}</td>
                <td>{condition}</td>
                <td>{region}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}

export default App;
