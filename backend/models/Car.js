const mongoose = require("mongoose");

module.exports = mongoose.model("Car", new mongoose.Schema({
  name: String,
  model: String,
  motor: String,
  year: Number,
  color: String,
  km: Number,
  tanirovka: Boolean,
  bio: String,
  price: Number,
  category: String,
  createdBy: String
}));
