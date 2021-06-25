const express = require('express');
const cors = require('cors');
// const client = require('./client.js');
const app = express();
const morgan = require('morgan');
// const ensureAuth = require('./auth/ensure-auth');
// const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

app.get('/location', async(req, res) => {
  try {
    const data = [
      {
        'formatted_query': 'Seattle, WA, USA',
        'latitude': '47.606210',
        'longitude': '-122.332071'
      }
    ];
    
    res.json(data);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
