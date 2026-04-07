// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// Root route (optional UI)
app.get("/", (req, res) => {
  res.send(`
    <h1>Timestamp Microservice</h1>
    <p>Use endpoint: /api/:date?</p>
    <p>Example: /api/2015-12-25 or /api/1451001600000</p>
  `);
});


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  let parsedDate;

  // If no date → current time
  if (!date) {
    parsedDate = new Date();
  } 
  // If it's a Unix timestamp (only digits)
  else if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } 
  // Otherwise parse as normal date string
  else {
    parsedDate = new Date(date);
  }

  // Invalid date check
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


