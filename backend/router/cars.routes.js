const { Router } = require("express");
const authorization = require("../middlewares/authorization");
const carValidationMidlleware = require("../middlewares/car.validation.midlleware");
const { getCars, addCar, getCar, updateCar, deleteCar } = require("../CONTROLLER/cars.controller");

const CarsRouter = Router();
CarsRouter.get("/get_cars",getCars);
CarsRouter.post("/add_car", authorization, carValidationMidlleware, addCar);
CarsRouter.get("/get_car/:id", getCar);
CarsRouter.put("/update_car/:id", authorization, carValidationMidlleware, updateCar);
CarsRouter.delete("/delete_car/:id", authorization, deleteCar);

module.exports = CarsRouter;