import React from 'react'
import { useState } from 'react'

const CityInputForm = ({onWeatherData}) => {
  const [city, setCity] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`api/weather/city?city=${city}`)
    const weatherData = await response.json()
    onWeatherData(weatherData)
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
      type="text"
      value={city}
      onChange={(e)=> setCity(e.target.value)}
      placeholder="Enter City Name"
      >
      </input>
      <button
      type="submit"
      >
        Get weather info
      </button>
    </form>
      
    
  )
}

export default CityInputForm