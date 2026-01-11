const jwt = require("jsonwebtoken"); 
const CustomErrorHandler = require("../utils/custom-error-handler");

module.exports = function (req, res, next) {
  try {
    const accesstoken =
      req.cookies?.access_token ||
      (req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!accesstoken) {
      return next(CustomErrorHandler.Unauthorized("Access token not found!"));
    }

    let decoded;
    try {
      decoded = jwt.verify(accesstoken, process.env.SECRET_KEY);
    } catch (err) {
      return next(CustomErrorHandler.Unauthorized("Invalid or expired token!"));
    }

    req.user = decoded;

    const allowedRoles = ["admin"];
    if (!allowedRoles.includes(req.user.role)) {
      return next(CustomErrorHandler.Forbidden("You are not admin"));
    }

    next();
  } catch (error) {
    next(error);
  }
};