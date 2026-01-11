const { Saved } = require("../controller/saved.controller")
const authmiddleware = require("../middleware/authmiddleware")

const savedrouter = require("express").Router()



savedrouter.post("/cars/:id/saved", authmiddleware, Saved)

module.exports = savedrouter 