const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    model: {
      type: String,
      required: true,
      trim: true, 
    },

    year: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear(),
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
      minlength: 20,
    },

    images: {
      type: [String], 
      required: true,
    },

    interiorImages: {
      type: [String], 
      default: [],
    },

    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);