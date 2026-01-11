const Joi = require("joi");

exports.CarValidator = function (data) {
     try {
  const schema = Joi.object({
    brand: Joi.string().trim().required(), 
    model: Joi.string().trim().min(2).max(50).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    price: Joi.number().min(0).required(),
    createdBy: Joi.string().max(500).optional(),
    description: Joi.string().min(20).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    interiorImages: Joi.array().items(Joi.string().uri()).optional(),
    status: Joi.string().valid("available", "sold").optional(),
  });

  return schema.validate(data); 
    } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};