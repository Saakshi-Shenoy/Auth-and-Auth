const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


// token payload { userId } looks like this -
// {
//   userId: user._id,
//   iat: ......,
//   exp: .........
// }