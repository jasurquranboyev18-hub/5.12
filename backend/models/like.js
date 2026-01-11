const mongoose = require("mongoose");

module.exports = mongoose.model("Like", new mongoose.Schema({
  userId: String,
  carId: String
}));
