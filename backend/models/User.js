const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "manager"],
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    emailToken: String,
    emailTokenExpires: Date,

    resetToken: String,
    resetTokenExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
