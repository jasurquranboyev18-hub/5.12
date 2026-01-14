const { Schema, model } = require("mongoose");


const carSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Carsschema = model("Car", carSchema);
module.exports = Carsschema