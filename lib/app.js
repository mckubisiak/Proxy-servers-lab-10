const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');
const { wrangleLocationResponse } = require('./wrangledata');
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
    
    console.log(data.body);
    res.json(wrangledData);
  } catch(e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
});

// app.use(require('./middleware/error'));

module.exports = app;
