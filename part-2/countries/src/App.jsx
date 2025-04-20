import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ListCountries from './components/ListCountries'
import CountryDetails from './components/CountryDetails'
import axios from 'axios'


const App = () =>
{
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  const fetchWeather = (country) =>
  {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
    axios
      .get(url)
      .then(response => setCurrentWeather(response.data))
      .catch(error =>
      {
        console.error('Error fetching weather data:', error)
      }
      )
  }
  const handleFilterChange = (event) =>
  {
    setFilter(event.target.value)
  }
  const handleSelectCountry = (country) =>
  {
    setSelectedCountry(country)
    fetchWeather(country)
  }
  const handleCountryDeselect = () =>
  {
    setSelectedCountry(null)
    setCurrentWeather(null)
  }

  // Fetch countries based on the filter
  const fetchCountries = () =>
  {
    if (filter !== null)
    {
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response =>
        {
          const filterCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          setCountries(filterCountries)
          if (filterCountries.length === 1)
            handleSelectCountry(filterCountries[0])
          else
            handleCountryDeselect()
        })
    }
    else
      setCountries([])
  }

  useEffect(() => fetchCountries(), [filter])

  return (
    <>
      <div>
        <h1>Countries</h1>
        <Filter
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        {filter && countries.length > 0 && (
          <><ListCountries
            countries={countries}
            handleSelectCountry={handleSelectCountry}
          />
            <CountryDetails
              country={selectedCountry}
              currentWeather={currentWeather}
            />
          </>)
        }
      </div >
    </>
  )
}

export default App
