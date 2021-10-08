# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Task description:

Displaying the current weather of the user by his location by default if the user granted location access.
Adding a city to the list by autocompleting search and save it to application settings.
Switching from Celsius to Fahrenheit by clicking on the corresponding sign, for each card separately. Should be saved as application settings.
Language switching globally for all displayed cities. Available languages are English, Ukrainian, and Rusian. Should be saved as application settings.
Displaying an icon from the OpenWeatherMap service
Using this request https://api.openweathermap.org/data/2.5/forecast?q= {city_name }&appid={API_KEY} create a graph of temperature and date dependencies (using any library for plotting)