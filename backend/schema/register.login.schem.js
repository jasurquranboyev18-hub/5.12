const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      unique: [true, "Bunaday username avval kiritilgan"],
      match: [/^[a-zA-Z0-9_]+$/, "faqat harf kiriting"],
    },
    email: {
      type: String,
      required: [true, "Email majburiy"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Email noto‘g‘ri formatda (masalan: test@gmail.com)",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: [8, "Parol kamida 8 ta belgidan iborat bo‘lishi kerak"],
    },
    role: {
      type: String,
      set: value => value.toLowerCase(),
      enum: {
        values: [ "admin", "user"],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`
      },
      default: "user"
    },
    otp: {
      type: String,
      default: null
    },
     isVerified: {
      type: Boolean,
      default: false
    },
    otpTime: {
      type: Number,
      default: null
    },
       first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
    },
    phone_number: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\+998\d{2} d{3} d{2} d{2}/;
        },
        message: "telefon raqam formati +99890 000 00 00 bunday bo'lishi kerak",
      },
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userSchema = model("User", UserSchema);

module.exports = userSchema;