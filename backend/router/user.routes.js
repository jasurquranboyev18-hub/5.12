const {Router} = require("express")
const authmiddleware = require("../middlewares/auth.middleware")
const { change_password, add_profile, getProfile, updateProfile } = require("../CONTROLLER/users.controller")

const userRouter = Router()

userRouter.post("/change_password", authmiddleware, change_password)
userRouter.post("/add_profile",authmiddleware, add_profile)
userRouter.get("/get_profile", authmiddleware, getProfile)
userRouter.put("/update_profile", authmiddleware, updateProfile)


module.exports = userRouter