import axios from "axios";

const geoUrl = "https://api.openweathermap.org/geo/1.0/direct";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (city, apiKey) => {
  return axios
    .get(`${geoUrl}?q=${city}&limit=1&appid=${apiKey}`)
    .then(response => {
        if (response.data.length === 0) {
            throw new Error("City not found");
        }

        const { lat, lon } = response.data[0];

        return axios.get(
            `${weatherUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

export default { getWeather };