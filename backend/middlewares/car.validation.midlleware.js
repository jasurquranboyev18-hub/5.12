const CustomErrorHandler = require("../utils/custom-error.handler")


module.exports = function(req, res, next){
    const {error} = CarValidator(req.body)

    if(error){
      throw CustomErrorHandler.BadRequest(error.message)
    }

    next()
}