const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const mongo = require("mongodb");
const bodyParser = require("body-parser");
const passport = require("passport");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const users = require("./routes/auth");
const goals = require("./routes/goals");
const logs = require("./routes/FoodLogs");
const healthTracker = require("./routes/api/healthTracker");
const app = express();
const cors = require("cors");

const path = require("path");

// CORS workaround for localhost
const corsOptions = {
  origin: function(origin, callback) {
    if (origin === "http://localhost:3000") {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  }
};
app.use(cors(corsOptions));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));
// Routes
// app.use(routes);
// app.use(models);
app.use("/auth", users);
app.use("/FoodLog", logs);
app.use("/goals", goals);
app.use("/api/healthTracker", healthTracker);
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
