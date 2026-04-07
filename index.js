const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 5000
var listener = app.listen(process.env.PORT || 5000, "0.0.0.0", function () {
  console.log("Your app is listening on port " + listener.address().port);
});
