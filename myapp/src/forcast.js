import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { ReactComponent as Sun } from './images/Sun.svg'
import { ReactComponent as Moon } from './images/Moon.svg'


function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Bangalore");
  }, []);
  
  return (
    <div className="forecast">
      <div className="dark_mode">
        <input
          className="dark_mode_input"
          type="checkbox"
          id="darkmode-toggle"
          checked={props.theme}
          onChange={props.click}
        />
        <label className="dark_mode_label" htmlFor="darkmode-toggle">
          {props.theme ? <Sun />: <Moon />}
        </label>
      </div>
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={props.theme ? defaults.color : 'black'}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className={props.theme ? "today-weather" : 'dark_today-weather'}>
        <h3>{props.weather}</h3>
        <div className={props.theme ? "search-box" : 'dark_search-box'}>
          <input
            type="text"
            className="search-bar"
            size='28'
            placeholder="Enter City Name or Zip Code"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            {" "}
            <img
              alt='searchIcon'
              src={props.theme ? "https://images.avishkaar.cc/workflow/newhp/search-white.png" : "https://res.cloudinary.com/dv99nu7xv/image/upload/v1718470781/icons8-search-50_hlxubu.png"}
              onClick={search}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  alt="weatherIcon"
                  className={props.theme ? null : "temp1"}
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
