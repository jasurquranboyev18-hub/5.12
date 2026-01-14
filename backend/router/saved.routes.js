const { Saved } = require("../CONTROLLER/seved.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const savedrouter = require("express").Router()



savedrouter.post("/cars/:id/saved", authMiddleware, Saved)

module.exports = savedrouter 