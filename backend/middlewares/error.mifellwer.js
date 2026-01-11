const CustomErrorHandler = require("../utils/custom-error-handler");

module.exports = function (err, req, res, next) {
  try {
    if (err instanceof CustomErrorHandler) {
      return res
        .status(err.status)
        .json({ message: err.message, error: err.errors });
    }

    if ((err.name === "ValidationError")) {
      const errormessage = err.message.split(",");
      return res.status(400).json({
        message: errormessage,
      });
    }

    res.status(500).json({ message: err.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};