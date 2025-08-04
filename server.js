const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files if needed
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API route
app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let date;

  // If no date provided, use current time
  if (!dateInput) {
    date = new Date();
  } else {
    // Check if dateInput is an integer (Unix timestamp)
    if (/^\d+$/.test(dateInput)) {
      // Convert to number and use as milliseconds
      date = new Date(parseInt(dateInput));
    } else {
      // Try to parse date string
      date = new Date(dateInput);
    }
  }

  // If invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port 3000
const listener = app.listen(3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
