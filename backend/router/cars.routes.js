const { Router } = require("express");
const carController = require("../CONTROLLER/cars.controller");
const authorization = require("../middleware/authorization"); 
const carValidatorMiddleware = require("../middleware/car.validator.middleware");

const CarsRouter = Router();
CarsRouter.get("/get_cars", carController.getCars);
CarsRouter.post("/add_car", authorization, carValidatorMiddleware, carController.addCar);
CarsRouter.get("/get_car/:id", carController.getCar);
CarsRouter.put("/update_car/:id", authorization, carValidatorMiddleware, carController.updateCar
);
CarsRouter.delete("/delete_car/:id", authorization, carController.deleteCar);

module.exports = CarsRouter;