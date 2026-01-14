const { Router } = require("express");

const {
  getCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../CONTROLLER/catigory.controller");
const upload = require("../utils/multer");
const authorization = require("../middlewares/authorization");
const catigoryMidlleware = require("../middlewares/catigory.midlleware");

const categoryRouter = Router();

categoryRouter.get("/get_categories", getCategories);

categoryRouter.post("/add_category",catigoryMidlleware,upload.single("file"),addCategory);

categoryRouter.get("/get_category/:id", getCategory);

categoryRouter.put("/update_category/:id",authorization,upload.single("file"),updateCategory);

categoryRouter.delete("/delete_category/:id", authorization, deleteCategory);

module.exports = categoryRouter;
