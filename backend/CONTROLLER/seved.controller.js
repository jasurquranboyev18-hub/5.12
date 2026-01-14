const savedSchema = require("../schema/sevd.schema")



const Saved = async (req, res, next) => {
    try {
        const user_id = req.user.id    
        const car_id = req.params.id   

        const saved = await savedSchema.findOne({ user_id, car_id })

        if (saved) {
            await savedSchema.findByIdAndDelete(saved._id)

            return res.status(200).json({
                message: "saved off",
                saved: false
            })
        }

        await savedSchema.create({
            user_id,
            car_id,
            saved: true
        })

        res.status(201).json({
          message:"saved",
            saved: true
        })

    } catch (error) {
      next(error)
}
}

module.exports = { Saved,};