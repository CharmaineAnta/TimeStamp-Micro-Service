// server.js

const express = require('express');
const app = express();

// Enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (not necessary for API only)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  let date;

  // If no date is provided, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if it's a unix timestamp (number)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // If date is invalid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port 3000
const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
