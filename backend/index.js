const express = require("express")
const cors = require("cors")
const registerLoginRoutes = require("./router/register.login.routes")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const connectDB = require("./config/db_config")
const uploadRouter = require("./router/upload.routes")
const categoryRouter = require("./router/category.routes")
const errorMiddleware = require("./middleware/error.middleware")
const savedD = require("./router/saved.routes")
const authmiddleware = require("./middleware/authmiddleware")
const CarsRouter = require("./router/cars.routes")
const userRouter = require("./router/user.routes")
const savedrouter = require("./router/saved.routes")
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
app.use(errorMiddleware)
app.use(userRouter)
app.use(savedrouter)

app.listen(PORT, () =>  {
    console.log("ishladi: " + PORT);    
    
})