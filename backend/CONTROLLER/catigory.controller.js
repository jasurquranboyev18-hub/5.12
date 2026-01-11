const mongoose = require("mongoose");
const customErrorHandler = require("../utils/custom-error-handler");
const categorySchema = require("../schema/category.schema");

// GET ALL CATEGORIES
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// ADD CATEGORY
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await categorySchema.findOne({ name });
    if (exists) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await categorySchema.create({ name });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};


// GET SINGLE CATEGORY
const getCategory = async (req, res, next) => {
  try {
    const category = await categorySchema.findById(req.params.id);
    if (!category) {
      return next(customErrorHandler.NotFound("Category not found"));
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res, next) => {
  try {
    const category = await categorySchema.findById(req.params.id);
    if (!category) {
      return next(customErrorHandler.NotFound("Category not found"));
    }

    const { name } = req.body || {};
    if (!name) {
      return next(customErrorHandler.BadRequest("Category name is required"));
    }

    category.name = name;
    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CATEGORY
const deleteCategory = async (req, res, next) => {
  try {
    const category = await categorySchema.findById(req.params.id);
    if (!category) {
      return next(customErrorHandler.NotFound("Category not found"));
    }

    await categorySchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};