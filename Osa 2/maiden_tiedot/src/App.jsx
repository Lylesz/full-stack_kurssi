import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterCond, handleCondChange}) => {
  return (
    <div>
      filter countries <input value={filterCond} onChange={handleCondChange}/>
    </div>
  )
}

const Countries = ({ countriesToShow, apiKey }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry(countriesToShow[0])
    } else {
      setSelectedCountry(null)
    }
  }, [countriesToShow])

  useEffect(() => {
    if (selectedCountry) {
      const city = selectedCountry.capital
      //console.log('city', city, 'apiKey', apiKey);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric` 

      axios.get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(error => console.error(error))
    }
  }, [selectedCountry, apiKey])
  if (countriesToShow.length === 0) {
    return <p>Give a filter condition</p>
  } else if (countriesToShow.length > 10) {
    return <p>Too many matches</p>
  } else if (selectedCountry && weather) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Area: {selectedCountry.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.values(selectedCountry.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
        <h3>Weather in {selectedCountry.capital}</h3>
        <p>Temperature: {weather.main ? `${weather.main.temp} °C` : 'No temperature available'}</p>
        <p>Wind: {weather.wind ? `${weather.wind.speed} m/s` : 'No wind speed available'}</p>
        <button onClick={() => setSelectedCountry(null)}>Back to list</button>
      </div>
    );
  } else { 
    return (
      <div>
        <ul>
          {countriesToShow.map(country => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>More information</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};




const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCond, setFilterCond] = useState('')
  const apiKey = import.meta.env.VITE_API_KEY

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all/')
      .then(response => {
        const countryNames = response.data.map(country => country)
        setCountries(countryNames)
        
      })
      .catch(error => console.error(error))
      
  }, [])

  const handleCondChange = (event) => {
    console.log(event.target.value)
    const condition = event.target.value
    setFilterCond(condition)
    //console.log('filterCond', filterCond, 'condition', condition)
  }

  useEffect(() => {
    if (countries) {
      //console.log(countries)
    }
  }, [countries])

  const countriesToShow = filterCond
  ? countries.filter(country => country.name.common.toLowerCase().includes(filterCond.toLowerCase()))
  : [];


  return (
    <div>
      <Filter filterCond={filterCond} handleCondChange={handleCondChange}/>
      <h1>Countries</h1>
      <Countries countriesToShow={countriesToShow} apiKey={apiKey} />
     
    </div>
  )
}

export default App

