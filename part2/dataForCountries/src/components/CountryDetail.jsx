import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const CountryDetail = (props) => {
    const [weather, setWeather] = useState(null);
    const api_key = import.meta.env.VITE_SOME_KEY;
    const countryDetail = props.countryDetail
    const capital = countryDetail.capital?.[0]
    const weatherIcon = weather?.weather?.[0].icon
    const weatherIconSrc = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

    useEffect(() => {
        if (capital) {
          weatherService
            .getWeather(capital, api_key)
            .then(data => setWeather(data))
            .catch(err => console.error("Weather fetch error:", err));
        }
    }, [capital, api_key]);

    return (
        <>
            <h1>{countryDetail.name.common}</h1>
            <div>Capital {capital}</div>
            <div>Area {countryDetail.area}</div>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryDetail.languages).map((language,i) => <li key={i}>{language}</li>)}
            </ul>
            <img src={countryDetail.flags.svg} alt={countryDetail.flags.alt} width="300" height="200"/>
            {weather && (
                <>
                    <h2>Weather in {capital}</h2>
                    <div>Temperature: {weather.main.temp} °C</div>
                    <img src={weatherIconSrc} alt={weather.weather.description} />
                    <div>Wind: {weather.wind.speed} m/s</div>
                </>
            )}
        </>
    )
}

export default CountryDetail