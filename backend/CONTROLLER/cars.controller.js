const mongoose = require("mongoose");
const CustomErrorHandler = require("../utils/custom-error-handler");
const carSchema = require("../schema/car.schema");

const getCars = async (req, res, next) => {
  try {
    const { brand, status } = req.query;

    const filter = {};
    if (brand) filter.brand = brand;
    if (status) filter.status = status;

    const cars = await carSchema.find(filter).sort({ createdAt: -1 });

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};


const addCar = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      description,
      images,
      interiorImages,
      status,
    } = req.body;

    if (!brand || !model || !year || !price || !description || !images) {
      return next(CustomErrorHandler.BadRequest("All required fields must be filled"));
    }

    const car = await carSchema.create({
      brand,
      model,
      year,
      price,
      description,
      images, 
      interiorImages: interiorImages || [], 
      status: status || "available",
      createdBy: req.user.id, 
    });

    res.status(201).json({
      message: "Car added successfully",
      car,
    });
  } catch (error) {
    next(error);
  }
};



const getCar = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(CustomErrorHandler.BadRequest("Invalid car id"));
    }

    const car = await carSchema.findById(req.params.id);

    if (!car) {
      return next(CustomErrorHandler.NotFound("Car not found"));
    }

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};


const updateCar = async (req, res, next) => {
  try {
    const updatedCar = await carSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCar) {
      return next(CustomErrorHandler.NotFound("Car not found"));
    }

    res.status(200).json({
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    next(error);
  }
};


const deleteCar = async (req, res, next) => {
  try {
    const car = await carSchema.findByIdAndDelete(req.params.id);

    if (!car) {
      return next(CustomErrorHandler.NotFound("Car not found"));
    }

    res.status(200).json({
      message: "Car deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCars,
  addCar,
  getCar,
  updateCar,
  deleteCar,
};