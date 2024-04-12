import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const city = req.query.city;
    const response = await fetch(`http://localhost:8080/weather/city?city=${city}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}