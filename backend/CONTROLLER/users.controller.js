const bcrypt = require("bcryptjs")
const CustomErrorHandler = require("../utils/custom-error.handler");
const userSchema = require("../schema/register.login.schem");
const savedSchema = require("../schema/sevd.schema");


const change_password = async (req, res, next) => {
  try {
    const { email, current_password, new_password, confirm_password } =
      req.body;

    if (new_password !== confirm_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and confirm password must be same"
      );
    }

    if (new_password === current_password) {
      throw CustomErrorHandler.BadRequest(
        "new password and current password must be different"
      );
    }

    const foundeduser = await userSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandler.Unauthorized("user not found");
    }

    const compare = await bcrypt.compare(
      current_password,
      foundeduser.password
    );

    if (compare) {
      if (req.user.email !== foundeduser.email) {
        throw CustomErrorHandler.Forbidden(
          "you have not access for this action"
        );
      }

      const hashpassword = await bcrypt.hash(new_password, 12);
      await userSchema.findByIdAndUpdate(foundeduser._id, {
        password: hashpassword,
      });
      return res.status(200).json({
        message: "Succesful",
      });
    } else {
      throw CustomErrorHandler.Unauthorized("wrong password");
    }
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id

 
    const user = await userSchema.findById(userId).select(
      "first_name last_name phone_number email avatar"
    )

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    
    const savedCars = await savedSchema.find({ user_id: userId })
      .populate("car_id")
      .select("car_id createdAt") 

   
    const savedCarsList = savedCars.map(item => ({
      ...item.car_id._doc,
      savedAt: item.createdAt
    }))

    res.status(200).json({
      user,
      savedCars: savedCarsList
    })

  } catch (error) {
    next(error)
  }
}

const add_profile = async (req, res, next) => {
  try {
    const userId = req.user.id 
    const { first_name, last_name, phone_number } = req.body

    const user = await userSchema.findById(userId)

    if (!user) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    
    if (user.first_name || user.last_name || user.phone_number) {
      throw CustomErrorHandler.BadRequest("Profile already exists")
    }

    user.first_name = first_name
    user.last_name = last_name
    user.phone_number = phone_number

    await user.save()

    res.status(201).json({
    message: "succesful added"
    })

  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { first_name, last_name, phone_number } = req.body

    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        phone_number
      },
      { new: true }
    )

    if (!updatedUser) {
      throw CustomErrorHandler.NotFound("User not found")
    }

    res.status(200).json({
      message: "Profile updated successfully"
    })

  } catch (error) {
    next(error)
  }
}


module.exports = {
  change_password,
  add_profile,
  getProfile,
  updateProfile,
  
};