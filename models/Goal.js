const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  weight: String,
  goal: String,
  by: String,
  user: {
    type: Schema.ObjectId,
    ref: "User"
  }
});

const Goal = mongoose.model("Goal", GoalSchema);
module.exports = Goal;
