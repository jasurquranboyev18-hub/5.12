const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../utils/custom-error-handler")

module.exports = function (req, res, next)  {
    try {
    const accesstoken =  req.cookies.access_token

     if(!accesstoken){
        throw CustomErrorHandler.Unauthorized("Access token not found!")
     }
     const decode = jwt.verify(accesstoken, process.env.SECRET_KEY)
      req.user = decode
      

      next()
    } catch (error) {
      next(error)
    }
}