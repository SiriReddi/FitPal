const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  day: String,
  meal: String,
  calories: Number,
  user: {
    type: Schema.ObjectId,
    ref: "User"
  }
});

const Log = mongoose.model("Log", LogSchema);
module.exports = Log;
