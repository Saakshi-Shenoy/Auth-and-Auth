const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loginLimiter } = require("../middleware/rateLimit");
const { verifyEmail } = require("../controllers/auth.controller");
const RefreshToken = require("../models/RefreshToken");

const {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAll
} = require("../controllers/auth.controller");

const {
  forgotPassword,
  resetPassword
} = require("../controllers/auth.controller");

const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/token");

router.post("/register", register);
router.post("/login",loginLimiter, login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.post("/logout-all", logoutAll);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const accessToken = generateAccessToken(req.user._id);
    const refreshToken = generateRefreshToken(req.user._id);

    await RefreshToken.create({
      user: req.user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict"
    });

    res.redirect(`http://localhost:3000/oauth-success?token=${accessToken}`);
  }
);

router.get("/verify/:token", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


//test protected route
const { protect } = require("../middleware/auth.middleware");

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});


module.exports = router;
