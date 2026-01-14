
const bcryptjs = require("bcryptjs");
const emailSender = require("../utils/emal");
const { accesstoken, refreshtoken } = require("../utils/token");
const userSchema = require("../schema/register.login.schem");
const CustomErrorHandler = require("../utils/custom-error.handler");

const register = async (req, res, next) => {
  try {
    const { username, email, password, admin_key } = req.body;

    if (!username || !email || !password ) {
      throw CustomErrorHandler.BadRequest(
        "Username, email, password are required"
      );
    }

    const emailExist = await userSchema.findOne({ email });
    if (emailExist) {
      throw CustomErrorHandler.BadRequest("Email already exists");
    }

    const usernameExist = await userSchema.findOne({ username });
    if (usernameExist) {
      throw CustomErrorHandler.BadRequest("Username already exists");
    }

    const hash = await bcryptjs.hash(password, 12);

    const otp = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const otpTime = Date.now() + 2 * 60 * 1000;

    let role = "user";
    if (admin_key && admin_key === process.env.ADMIN_KEY) {
      role = "admin";
    }

    await userSchema.create({
      username,
      email,
      password: hash,
      otp,
      otpTime,
      role
    });

    await emailSender(otp, email);

    res.status(201).json({
      message: "Register successful. Please verify your email"
    });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const foundedUser = await userSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.Unauthorized("User not found!");
    }

    const time = Date.now();

    if (foundedUser.otpTime < time) {
      throw CustomErrorHandler.BadRequest("otp time expired");
    }

    if (foundedUser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("Wrong verification code");
    }

    await userSchema.findByIdAndUpdate(foundedUser._id, {
      isVerified: true,
    });

    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id,
    };

    const access_token = accesstoken(payload);
    const r_token = refreshtoken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });
    res.cookie("refresh_token", r_token, {
      httpOnly: true,
      maxAge: 3600 * 1000 * 24 * 15,
    });

    res.status(200).json({
      message: "Succesful",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw CustomErrorHandler.Unauthorized("Email, password are required!");
    }

    const foundedUser = await userSchema.findOne({ email });
    if (!foundedUser) {
      throw CustomErrorHandler.BadRequest("Email or password is incorrect!");
    }

    const isMatch = await bcryptjs.compare(password, foundedUser.password);
    if (!isMatch) {
      throw CustomErrorHandler.Unauthorized("Invalid password");
    }

    if (!foundedUser.isVerified) {
      throw CustomErrorHandler.Unauthorized("User is not verified");
    }

    const payload = {
      username: foundedUser.username,
      email: foundedUser.email,
      role: foundedUser.role,
      id: foundedUser._id,
    };    

    const access_token = accesstoken(payload);
    const refresh_token = refreshtoken(payload);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    next(error);
  }
};

const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      throw CustomErrorHandler.Unauthorized("User not found");
    }

    const otp = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const otpTime = Date.now() + 2 * 60 * 1000;

    user.otp = otp;
    user.otpTime = otpTime;
    await user.save();

    await emailSender(otp, email);

    res.status(200).json({
      message: "OTP resent successfully"
    });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, otp, new_password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      throw CustomErrorHandler.Unauthorized("User not found");
    }

    if (user.otpTime < Date.now()) {
      throw CustomErrorHandler.BadRequest("OTP expired");
    }

    if (String(user.otp) !== String(otp)) {
      throw CustomErrorHandler.BadRequest("Wrong OTP");
    }

    const hash = await bcryptjs.hash(new_password, 12);

    user.password = hash;
    user.otp = null;
    user.otpTime = null;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verify,
  login,
  logout,
  resendOtp,
  forgotPassword
};