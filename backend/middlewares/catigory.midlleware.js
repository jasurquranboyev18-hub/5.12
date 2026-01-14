
const CustomErrorHandler = require("../utils/custom-error.handler")
const { CategoryValidator } = require("../VALIDATOR/catigorey.validotor")




module.exports = function(req, res, next){
    const {error} = CategoryValidator(req.body)

    if(error){
      throw CustomErrorHandler.BadRequest(error.message)
    }

    next()
}