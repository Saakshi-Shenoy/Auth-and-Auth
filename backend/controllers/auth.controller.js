const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AuditLog = require("../models/AuditLog");
const { registerSchema } = require("../utils/validators");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });
};

// REGISTER
exports.register = async (req, res) => {

  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.errors
    });
  }

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const emailToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      email,
      password: hashedPassword,
      emailToken,
      emailTokenExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    console.log(
      `Verify email link: http://localhost:3000/verify-email?token=${emailToken}`
    );

    res.status(201).json({
      message: "User registered. Please verify your email."
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const RefreshToken = require("../models/RefreshToken");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await AuditLog.create({
      user: user._id,
      action: "LOGIN",
      ip: req.ip,
      userAgent: req.headers["user-agent"]
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict"
    });

    res.json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const newAccessToken = generateAccessToken(decoded.userId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Token expired" });
  }
};

exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

exports.logoutAll = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Not authenticated" });

  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  await RefreshToken.deleteMany({ user: decoded.userId });

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out from all devices" });
};

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      emailToken: req.params.token,
      emailTokenExpires: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    user.isVerified = true;
    user.emailToken = undefined;
    user.emailTokenExpires = undefined;

    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.json({ message: "If user exists, email sent" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    console.log(
      `Reset password link: http://localhost:3000/reset-password?token=${resetToken}`
    );

    res.json({ message: "Reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.password, 12);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

