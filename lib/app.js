const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');
const { wrangleLocationResponse, wrangleWeatherResponse, wrangleReviewResponse } = require('./wrangledata');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const city = req.query.search;

    const data = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${city}&format=json`);
    const wrangledData =  wrangleLocationResponse(data.body);
    
    res.json(wrangledData);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
    const  { latitude, longitude } = req.query;

    const data = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`);

    const wrangledWeather = wrangleWeatherResponse(data.body);
    

    res.json(wrangledWeather);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {
    const  { latitude, longitude } = req.query;

    const data = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`)
    // eslint-disable-next-line indent
    .set('Authorization', `Bearer ${process.env.YELP_KEY}`);


    const wrangledWeather = wrangleReviewResponse(data.body);

    res.json(wrangledWeather);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// app.use(require('./middleware/error'));

module.exports = app;
