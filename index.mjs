// Import the Express.js framework
import express from 'express';
// Import the Axios library for making HTTP requests
import axios from 'axios';

// Create a new Express.js app
const app = express();

// Set the port number for the server
const port = 3000;

// Use the Express.js static middleware to serve static files from the public directory
app.use(express.static('public'));

// Set the view engine to EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Define a route for the /weather endpoint
app.get('/weather', async (req, res) => {
  // Get the city name from the query string
  const city = req.query.city;
  // Set the API key for the OpenWeatherMap API
  const apiKey = '607a5cd4fe2bfd5234cc5eabf0350a17';
  // Construct the API URL for the OpenWeatherMap API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    // Make a GET request to the OpenWeatherMap API
    const response = await axios.get(apiUrl);
    // Get the weather data from the response
    const weatherData = response.data;
    // Render the index.ejs template with the weather data
    res.render('index', { weatherData });
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

// Define a route for the root endpoint
app.get('/', (req, res) => {
  // Render the index.ejs template without any weather data
  res.render('index');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});