const { Router } = require("express")

const { getCategories, addCategory, getCategory, updateCategory, deleteCategory, } = require("../controller/category.controller");
const authorization = require("../middleware/authorization");
const upload = require("../utils/multer");
const categoryMiddleware = require("../middleware/category.middleware");


const categoryRouter = Router()

categoryRouter.get("/get_categories", getCategories);

categoryRouter.post("/add_category", categoryMiddleware,   upload.single("file"),  addCategory);

categoryRouter.get("/get_category/:id", getCategory);

categoryRouter.put("/update_category/:id", authorization, upload.single("file"),  updateCategory);

categoryRouter.delete("/delete_category/:id", authorization,  deleteCategory);

module.exports = categoryRouter;