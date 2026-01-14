const express = require("express")
const cors = require("cors")
const registerLoginRoutes = require("./router/register.login.routes")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const connectDB = require("./config/db")
const uploadRouter = require("./router/catigore.routes")
const savedD = require("./router/saved.routes")
const authmiddleware = require("./middlewares/auth.middleware")
const CarsRouter = require("./router/cars.routes")
const userRouter = require("./router/user.routes")
const savedrouter = require("./router/saved.routes")
const categoryRouter = require("./router/catigore.routes")
const errorMifellwer = require("./middlewares/error.mifellwer")
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("upload/images"))
app.use(cookieParser())
app.use(cors({origin: true, credentials: true}))

connectDB()
//routers
app.use(registerLoginRoutes)
app.use(CarsRouter)
app.use(uploadRouter)
app.use(categoryRouter)
app.use(errorMifellwer)
app.use(userRouter)
app.use(savedrouter)

app.listen(PORT, () =>  {
    console.log("ishladi: " + PORT);    
    
})