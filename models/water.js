const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waterSchema = new Schema({
  water: { type: String, default: 0 }
});

const Water = mongoose.model("Water", waterSchema);

module.exports = Water;
