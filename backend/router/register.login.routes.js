const {Router} = require("express")
const { register, login, verify, logout, resendOtp,  } = require("../CONTROLLER/register.login")

const registerLoginRoutes = Router()
 
registerLoginRoutes.post("/register", register)
registerLoginRoutes.post("/verify", verify)
registerLoginRoutes.post("/login", login)
registerLoginRoutes.get("/logout", logout)
registerLoginRoutes.get("/resend_otp", resendOtp)

module.exports = registerLoginRoutes 