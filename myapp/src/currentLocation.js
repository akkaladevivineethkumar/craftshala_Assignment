import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import ReactAnimatedWeather from "react-animated-weather";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    theme: false,
  };

  handleClick = () => {
    this.setState((prevState) => ({
      theme: !prevState.theme
    }));
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    });
    console.log(this.state.temperatureC)
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  render() {
    if (this.state.temperatureC) {
      const clockStyle = this.state.theme ? null : { color: 'black' };
      return (
        <React.Fragment>
          <div className={this.state.theme ? "container" : 'dark_container'}>
            <div className={this.state.theme ? "city" : 'dark_city'}>
              <div className={this.state.theme ? "title" :  "dark_title"}>
                <h2>{this.state.city}</h2>
                <h3>{this.state.country}</h3>
              </div>
              <div className="mb-icon">
                {" "}
                <ReactAnimatedWeather
                  icon={this.state.icon}
                  color={defaults.color}
                  size={defaults.size}
                  animate={defaults.animate}
                />
                <p>{this.state.main}</p>
              </div>
              <div className={this.state.theme? "date-time" : "dark_date-time"}>
                <div className="dmy">
                  <div id="txt"></div>
                  <div className="current-time">
                    <Clock format="HH:mm:ss" interval={1000} style={clockStyle} ticking={true} />
                  </div>
                  <div className="current-date">{dateBuilder(new Date())}</div>
                </div>
                <div className="temperature">
                  <p>
                    {this.state.temperatureC}°<span>C</span>
                  </p>
                </div>
              </div>
            </div>
            <Forcast theme = {this.state.theme} click={this.handleClick} icon={this.state.icon} weather={this.state.main} />
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "400px" }}> <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" ,letterSpacing: "3px"}}>
            Detecting your location
          </h3>

            <p style={{ color: "white", marginTop: "10px", letterSpacing: "3px", lineHeight: "24px" }}>

              The app will show your current location and  <br></br>use it to provide real-time weather updates.
            </p></div>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
