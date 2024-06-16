# Weather App

## Description

This Weather App is a responsive and dynamic weather forecasting application that provides real-time weather information based on the user's current location or a manually entered city/zip code. The app features a toggle for light and dark themes, a visually appealing animated weather icon, and detailed weather data including temperature, humidity, visibility, and wind speed.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Hooks**: Used for managing state and side effects in functional components.
- **React Animated Weather**: A React component for displaying animated weather icons.
- **react-live-clock**: A React component for displaying live time.
- **Axios**: A promise-based HTTP client for making API calls.
- **OpenWeatherMap API**: Provides the weather data for the application.

## Key Components

### `Weather`

- **State Management**: Manages various states such as location coordinates, weather data, error messages, and theme.
- **Geolocation**: Uses the browser's geolocation API to fetch the user's current position.
- **Weather Data Fetching**: Fetches weather data from the OpenWeatherMap API using the latitude and longitude.
- **Icon Selection**: Selects appropriate weather icons based on the current weather conditions.
- **Theme Toggle**: Allows switching between light and dark themes.

### `Forcast`

- **State Management**: Manages states for search queries, weather data, and errors.
- **Search Functionality**: Allows users to search for weather data by city name or zip code.
- **Weather Data Display**: Displays detailed weather information such as temperature, humidity, visibility, and wind speed.
- **Theme Toggle**: Allows switching between light and dark themes, syncing with the parent component (`Weather`).