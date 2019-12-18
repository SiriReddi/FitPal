const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
  water: { type: Schema.Types.ObjectId, ref: "Water" },
  totalActivity: { type: Number, default: 0 },
  weight: { type: Number }
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
