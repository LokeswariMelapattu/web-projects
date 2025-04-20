
const Header = ({ country }) =>
{
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
        </>
    )
}
const Languages = ({ languages }) =>
{
    return (
        <>
            <h2>Languages</h2>
            <ul>
                {languages.map((language, index) => (
                    <li key={index}>{language}</li>
                ))}
            </ul>
        </>
    )

}
const Weather = ({ capital, currentWeather }) =>
{

    return <> <h2>Weather in {capital}</h2>
        {currentWeather && (
            <div>
                <p>Temperature {currentWeather.main.temp} Celsius</p>
                <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
                    alt={currentWeather.weather[0].description}
                    title={currentWeather.weather[0].description}
                />
                <p>Wind {currentWeather.wind.speed} m/s</p>
            </div>
        )}
    </>
}
const CountryDetails = ({ country, currentWeather }) =>
{
    if (!country) return null; // Handle case when no country is selected
    return (
        <div>
            <Header country={country} />
            <Languages languages={Object.values(country.languages)} />
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" height="100" />
            <Weather capital={country.capital[0]} currentWeather={currentWeather} />
        </div>
    );
}

export default CountryDetails;